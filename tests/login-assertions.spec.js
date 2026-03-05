import { test, expect } from "@playwright/test";

test("Login success redirects to dashboard (Assertions)", async ({ page }) => {
  await page.goto("/login"); // if your login is "/", change to "/"

  await page.fill('input[name="email"]', "admin@example.com");
  await page.fill('input[name="password"]', "password");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/dashboard/);
});