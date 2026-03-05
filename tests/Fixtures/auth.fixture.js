import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
   await page.goto("/login");
  await page.fill('input[name="email"]',"admin@example.com");
  await page.fill('input[name="password"]',"password");
  await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);

    await use(page);

    // Teardown example (optional): logout (if you have logout button later)
    // await page.getByTestId("logout-btn").click();
  },
});

export { expect };