import { expect, test } from "@playwright/test";
import { BACKEND_URL, FRONTEND_URL } from "./config";

const bookName = "The Catcher in the Rye";
test.beforeEach(async ({ page }) => {
  await page.request.get(BACKEND_URL + "/test/reset-and-seed");
  await page.goto(FRONTEND_URL + "/login");
  await page.getByRole("button", { name: "Generate user" }).click();
  await page.getByRole("link").filter({ hasText: bookName }).click();
});

test("borrows a book", async ({ page }) => {
  await expect(page.getByText("Available", { exact: true })).toHaveCount(1);
  await page.getByRole("link", { name: "Profile" }).click();
  await expect(page.getByTestId("borrowed-item")).toBeHidden();
  await page.goBack();

  await page.getByRole("button", { name: "Borrow" }).click();

  await expect(page.getByText("Available", { exact: true })).toHaveCount(0);

  await page.getByRole("link", { name: "Profile" }).click();
  await expect(page.getByTestId("borrowed-item")).toHaveCount(1);
});

test("returns a book", async ({ page }) => {
  await page.getByRole("button", { name: "Borrow" }).click();
  await page.getByRole("link", { name: "Profile" }).click();

  await expect(page.getByTestId("borrowed-item")).toBeVisible();

  await page.getByRole("button", { name: "Return" }).click();

  await expect(page.getByTestId("borrowed-item")).toBeHidden();

  await page.getByRole("link", { name: "Home" }).click();
  await page.getByRole("link").filter({ hasText: bookName }).click();

  await expect(page.getByText("Available", { exact: true })).toHaveCount(1);
});
