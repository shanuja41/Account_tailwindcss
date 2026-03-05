import { test, expect } from "@playwright/test";

test("Demo failure for report screenshot", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByText("This text does not exist")).toBeVisible();
});