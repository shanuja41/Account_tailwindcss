import { test, expect } from "./Fixtures/auth.fixture";

test('Open All Income page using Fixture login', async ({ loggedInPage }) => {
  const { page, logout } = loggedInPage;
  
  // Navigate to income page
  await page.goto("/income/all");
  
  // Test 1: Verify page header
  await expect(page.getByText('All Income').first()).toBeVisible();
  
  // Test 2: Verify action buttons
  await expect(page.getByRole('button', { name: 'Add Income' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export' })).toBeVisible();
  
  // Test 3: Verify search bar
  await expect(page.getByPlaceholder('Search income by source, category...')).toBeVisible();
  
  // Test 4: Verify summary cards - FIXED VERSION
  // Option A: If these are in specific card components, target them by their container
  await expect(page.locator('.grid').getByText('Total Income')).toBeVisible();
  await expect(page.locator('.grid').getByText('Transactions', { exact: true })).toBeVisible();
  await expect(page.locator('.grid').getByText('Average Amount')).toBeVisible();
  await expect(page.locator('.grid').getByText('Pending')).toBeVisible();
 
  
  // Test 5: Verify table headers
  await expect(page.getByRole('columnheader', { name: 'Source' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Category' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Amount' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: 'Status' })).toBeVisible();
  
  // Test 6: Verify table has data
  const rowCount = await page.locator('tbody tr').count();
  expect(rowCount).toBeGreaterThan(0);
  
  
  // Test 8: Test search (simple)
  await page.getByPlaceholder('Search income by source, category...').fill('Client');
  await page.waitForTimeout(500); // Consider using more reliable wait
  await page.getByPlaceholder('Search income by source, category...').fill('');
  
  // Test 9: Verify breadcrumbs
  await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Income' })).toBeVisible();
  
  console.log('All Income page tests passed');
  
  // Logout
  await logout();
});