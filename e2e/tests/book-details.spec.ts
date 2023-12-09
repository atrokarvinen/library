import { expect, test } from "@playwright/test";
import { BACKEND_URL, FRONTEND_URL } from "./config";

test.beforeEach(async ({ page }) => {
  await page.request.get(BACKEND_URL + "/test/reset-and-seed");
  await page.goto(FRONTEND_URL);
});

test("shows book details", async ({ page }) => {
  const bookName = "The Catcher in the Rye";
  await page.getByRole("link").filter({ hasText: bookName }).click();
  await expect(page.getByRole("heading", { name: bookName })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Details" })).toBeVisible();
  await expect(page.getByRole("cell", { name: bookName })).toBeVisible();
  await expect(page.getByRole("cell", { name: "J.D. Salinger" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "16.7.1951" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "224" })).toBeVisible();
  await expect(page.getByText("Unavailable")).toHaveCount(1);
  await expect(page.getByText("Available", { exact: true })).toHaveCount(1);
});
