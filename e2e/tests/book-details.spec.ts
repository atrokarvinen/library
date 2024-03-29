import { expect, test } from "@playwright/test";
import { FRONTEND_URL } from "./config";
import { setup } from "./setup";

test.beforeEach(async ({ page }) => {
  await setup(page);
  await page.goto(FRONTEND_URL);
});

test("shows book details", async ({ page }) => {
  const bookName = "To Kill a Mockingbird";
  await page.getByRole("link").filter({ hasText: bookName }).click();
  await expect(page.getByRole("heading", { name: bookName })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Details" })).toBeVisible();
  await expect(page.getByRole("cell", { name: bookName })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Harper Lee" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "11.7.1960" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "281" })).toBeVisible();
  await expect(page.getByText("Available", { exact: true })).toHaveCount(2);
});
