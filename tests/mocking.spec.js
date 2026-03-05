import { test, expect } from "@playwright/test";

test("Add new income through modal", async ({ page }) => {

  //  STUBBING: login API call simulate (if your app calls /api/login)
  await page.route("**/api/login", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        token: "fake-token-123",
        user: { id: 1, email: "admin@example.com", role: "Admin" },
      }),
    });
  });

  //  MOCKING: income API responses simulate (if your app calls /api/income)
  await page.route("**/api/income", async (route) => {
    const req = route.request();
    const method = req.method();

    // GET: return mocked list
    if (method === "GET") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 999,
            source: "Mock Client Payment (From Mock API)",
            category: "Services",
            amount: 9999,
            date: "2024-02-10",
            status: "Received",
            paymentMethod: "Bank Transfer",
          },
        ]),
      });
    }

    // POST: accept new income (stub create)
    if (method === "POST") {
      const postData = req.postDataJSON?.() ?? {};
      return route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          success: true,
          message: "Income created (Stubbed)",
          data: { id: 1000, ...postData },
        }),
      });
    }

    // Other methods
    return route.fallback();
  });

  // Login (your original)
  await page.goto("/login");
  await page.locator('input[name="email"]').fill("admin@example.com");
  await page.locator('input[name="password"]').fill("password");
  await page.locator('button[type="submit"]').click();

  // Navigate to income page (your original)
  await page.goto("/income/all");

  // Wait for page to load (your original)
  await page.waitForSelector('table', { state: 'visible' });

  // Click Add Income button (your original)
  await page.locator('button').filter({ hasText: 'Add Income' }).first().click();

  // Wait for modal to appear (your original)
  await page.waitForSelector('h3:has-text("Add New Income")', { state: 'visible' });

  // Fill the form (your original)
  await page.fill('input[name="source"]', 'Mock Client Payment');
  await page.selectOption('select[name="category"]', 'Services');
  await page.fill('input[name="amount"]', '9999');
  await page.fill('input[name="date"]', '2024-02-10');
  await page.selectOption('select[name="status"]', 'Received');
  await page.selectOption('select[name="paymentMethod"]', 'Bank Transfer');

  // Click submit button (your original)
  await page.locator('form button[type="submit"]').click();

  // Wait for modal to close (your original)
  await page.waitForSelector('h3:has-text("Add New Income")', { state: 'detached' });

  // Wait for data to be processed (your original)
  await page.waitForTimeout(2000);

  // Search (your original)
  console.log('Using search to find the new data...');
  await page.locator('input[placeholder*="Search income"]').fill('Mock Client Payment');
  await page.waitForTimeout(1000);

  // Screenshot (your original)
  await page.screenshot({ path: 'search-results.png' });

  // Verify (your original)
  await expect(page.getByText('Mock Client Payment')).toBeVisible();
});