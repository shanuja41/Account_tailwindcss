import { test, expect } from "@playwright/test";

test("Login success redirects to dashboard (Assertions)", async ({ page }) => {

  console.log("Starting Login Test...");

  // Capture browser console logs
  page.on("console", msg => console.log("Browser Console:", msg.text()));

  await page.goto("/login");
  console.log("Navigated to Login Page");

  await page.fill('input[name="email"]', "admin@example.com");
  console.log("Email entered");

  await page.fill('input[name="password"]', "password");
  console.log("Password entered");

  await page.click('button[type="submit"]');
  console.log("Login button clicked");

  // Debug current URL
  const currentUrl = page.url();
  console.log("Current URL after login:", currentUrl);

  // URL Assertion
  await expect(page).toHaveURL(/dashboard/);
  console.log("URL assertion passed");

  // Debug page title
  const pageTitle = await page.title();
  console.log("Page Title:", pageTitle);

  // Title Assertion
  await expect(page).toHaveTitle(/accountingsystem/);
  console.log("Title assertion passed");

  // Dashboard heading visible
  await expect(page.getByText("Dashboard")).toBeVisible();
  console.log("Dashboard heading visible");

  // Welcome message visible
  await expect(page.getByText("Welcome back")).toBeVisible();
  console.log("Welcome message visible");

  // Cards visible
  await expect(page.getByText("Total Revenue")).toBeVisible();
  await expect(page.getByText("Total Expenses")).toBeVisible();
  await expect(page.getByText("Net Profit")).toBeVisible();
  await expect(page.getByText("Pending Invoices")).toBeVisible();
  console.log("Dashboard cards visible");

  // Transactions section visible
  await expect(page.getByText("Recent Transactions")).toBeVisible();
  console.log("Recent Transactions section visible");

  console.log("Test Completed Successfully");

});




test.describe("Auth Page - Fail Test Cases", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    console.log("Navigated to Login Page");
  });

  test("Fail Case 1 - Login with empty email and password", async ({ page }) => {
    console.log("Starting Fail Case 1");

    await page.click('button[type="submit"]');
    console.log("Clicked Sign In without entering credentials");

    await expect(page.getByText("Please fix the validation errors")).toBeVisible();
    await expect(page.getByText("Email address is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();

    console.log("Validation errors displayed correctly for empty login form");
  });

  test("Fail Case 2 - Login with invalid email format", async ({ page }) => {
    console.log("Starting Fail Case 2");

    await page.fill('input[name="email"]', "adminexample.com");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();

    console.log("Validation error displayed for invalid email format");
  });

  test("Fail Case 3 - Login with empty password only", async ({ page }) => {
    console.log("Starting Fail Case 3");

    await page.fill('input[name="email"]', "admin@example.com");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();

    console.log("Validation error displayed for empty password");
  });

  test("Fail Case 4 - Login with empty email only", async ({ page }) => {
    console.log("Starting Fail Case 4");

    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors")).toBeVisible();
    await expect(page.getByText("Email address is required")).toBeVisible();

    console.log("Validation error displayed for empty email");
  });

  test("Fail Case 5 - Signup with all fields empty", async ({ page }) => {
    console.log("Starting Fail Case 5");

    await page.getByRole("button", { name: "Sign Up" }).click();
    console.log("Switched to Sign Up form");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors below")).toBeVisible();
    await expect(page.getByText("Full name is required")).toBeVisible();
    await expect(page.getByText("Email address is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
    await expect(page.getByText("Please confirm your password")).toBeVisible();

    console.log("Validation errors displayed for empty signup form");
  });

  test("Fail Case 6 - Signup with invalid email", async ({ page }) => {
    console.log("Starting Fail Case 6");

    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "johnexample.com");
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors below")).toBeVisible();
    await expect(page.getByText("Please enter a valid email address")).toBeVisible();

    console.log("Validation error displayed for invalid signup email");
  });

  test("Fail Case 7 - Signup with short password", async ({ page }) => {
    console.log("Starting Fail Case 7");

    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="password"]', "12345");
    await page.fill('input[name="confirmPassword"]', "12345");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors below")).toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).toBeVisible();

    console.log("Validation error displayed for short password");
  });

  test("Fail Case 8 - Signup with password mismatch", async ({ page }) => {
    console.log("Starting Fail Case 8");

    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password321");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors below")).toBeVisible();
    await expect(page.getByText("Passwords do not match")).toBeVisible();

    console.log("Validation error displayed for password mismatch");
  });

  test("Fail Case 9 - Signup with invalid phone number", async ({ page }) => {
    console.log("Starting Fail Case 9");

    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "john@example.com");
    await page.fill('input[name="phone"]', "1234");
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Please fix the validation errors below")).toBeVisible();
    await expect(page.getByText("Please enter a valid 10-digit phone number")).toBeVisible();

    console.log("Validation error displayed for invalid phone number");
  });

  test("Fail Case 10 - Signup with already existing email", async ({ page }) => {
    console.log("Starting Fail Case 10");

    await page.getByRole("button", { name: "Sign Up" }).click();

    await page.fill('input[name="name"]', "John Doe");
    await page.fill('input[name="email"]', "existing@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.fill('input[name="confirmPassword"]', "password123");

    await page.click('button[type="submit"]');

    await expect(page.getByText("This email is already registered")).toBeVisible();

    console.log("API-like error displayed for existing email");
  });
});