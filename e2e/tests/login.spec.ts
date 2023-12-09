import { expect, test } from "@playwright/test";
import { FRONTEND_URL } from "./config";

test.beforeEach(async ({ page }) => {
  await page.goto(`${FRONTEND_URL}/login`);
});

test("sign up, login and logout", async ({ page }) => {
  const username = "testuser" + new Date().getTime();
  await expect(page.getByText("Logout")).toBeHidden();

  await page.getByRole("button", { name: "Sign up" }).click();
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password", { exact: true }).fill("testuser");
  await page.getByLabel("Confirm password").fill("testuser");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByRole("button", { name: "Submit" })).toBeHidden();

  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password", { exact: true }).fill("testuser");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Logout")).toBeVisible();
  await page.getByText("Logout").click();
  await expect(page.getByText("Logout")).toBeHidden();
});
