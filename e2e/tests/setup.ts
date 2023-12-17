import { Page } from "@playwright/test";
import { BACKEND_URL, BORROWING_URL } from "./config";

export const setup = async (page: Page) => {
  await page.request.delete(BORROWING_URL + "/test/reset");
  await page.request.get(BACKEND_URL + "/test/reset-and-seed");
};
