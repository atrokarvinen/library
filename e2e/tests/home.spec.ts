import { expect, test } from "@playwright/test";
import { BACKEND_URL, FRONTEND_URL } from "./config";

test.beforeEach(async ({ page }) => {
  await page.request.get(BACKEND_URL + "/test/reset-and-seed");
  await page.goto(FRONTEND_URL);
});

test("loads page", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Library" })).toBeVisible();
});

test("loads books", async ({ page }) => {
  await expect(page.getByTestId("book-list")).toBeVisible();
  await expect(page.getByTestId("book-card")).toHaveCount(9);
});

test("shows correct data in book card", async ({ page }) => {
  const card = await page
    .getByTestId("book-card")
    .filter({ hasText: "Pride and Prejudice" });

  await expect(card).toBeVisible();
  await expect(card).toContainText("Jane Austen");
  await expect(card).toContainText("1813");
  await expect(card).toContainText("Available (2)");
});

test("shows book availability", async ({ page }) => {
  const bookName = "The Catcher in the Rye";
  const card = await page
    .getByTestId("book-card")
    .filter({ hasText: bookName });

  await expect(card).toContainText("Available (1)");

  await page.getByRole("link", { name: "login" }).click();
  await page.getByRole("button", { name: "Generate user" }).click();

  await page.getByRole("link").filter({ hasText: bookName }).click();
  await page.getByRole("button", { name: "Borrow" }).click();
  await page.goBack();

  await expect(card).toContainText("Unavailable");
});
