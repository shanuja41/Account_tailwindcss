import { test, expect } from "@playwright/test";

test("Add new income through modal", async ({ page }) => {
  // Login
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@example.com");
  await page.locator('input[name="password"]').fill("password");
  await page.locator('button[type="submit"]').click();

  // Navigate to income page
  await page.goto("/income/all");
  
  // Wait for page to load
  await page.waitForSelector('table', { state: 'visible' });
  
  // Click Add Income button
  await page.locator('button').filter({ hasText: 'Add Income' }).first().click();
  
  // Wait for modal to appear
  await page.waitForSelector('h3:has-text("Add New Income")', { state: 'visible' });
  
  // Fill the form
  await page.fill('input[name="source"]', 'Mock Client Payment');
  await page.selectOption('select[name="category"]', 'Services');
  await page.fill('input[name="amount"]', '9999');
  await page.fill('input[name="date"]', '2024-02-10');
  await page.selectOption('select[name="status"]', 'Received');
  await page.selectOption('select[name="paymentMethod"]', 'Bank Transfer');
  
  // Click submit button
  await page.locator('form button[type="submit"]').click();
  
  // Wait for modal to close
  await page.waitForSelector('h3:has-text("Add New Income")', { state: 'detached' });
  
  // Wait for data to be processed
  await page.waitForTimeout(2000);
  
  // USE SEARCH to find the data (since you have a search bar)
  console.log('Using search to find the new data...');
  
  // Type the source in search
  await page.locator('input[placeholder*="Search income"]').fill('Mock Client Payment');
  await page.waitForTimeout(1000);
  
  // Take screenshot of search results
  await page.screenshot({ path: 'search-results.png' });
  
  // Verify search results show the data
  await expect(page.getByText('Mock Client Payment')).toBeVisible();
 
});