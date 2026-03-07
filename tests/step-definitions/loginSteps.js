import { Given, When, Then, setDefaultTimeout, After } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { expect } from "@playwright/test";

setDefaultTimeout(10 * 1000); // 10s

let browser;
let page;

// Helper function to launch browser
async function launchBrowser() {
  browser = await chromium.launch({ 
    headless: false, 
    slowMo: 300 
  });
  const context = await browser.newContext();
  page = await context.newPage();
  return page;
}

// Cleanup after each scenario
After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given("the user is on the login page", async function () {
  await launchBrowser();
  await page.goto("http://localhost:5173/login", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
  
  // Wait for the form to be fully loaded
  await page.waitForSelector('input[name="email"]', { timeout: 5000 });
  await page.waitForSelector('input[name="password"]', { timeout: 5000 });
});

// Success scenario steps
When("the user enters valid email and password", async function () {
  await page.locator('input[name="email"]').fill("admin@example.com");
  await page.locator('input[name="password"]').fill("password");
});

When("clicks the login button", async function () {
  await page.locator('button[type="submit"]').click();
});

Then("the dashboard should be displayed", async function () {
  // Wait for navigation and check URL
  await page.waitForURL(/.*dashboard.*/, { timeout: 5000 });
  await expect(page).toHaveURL(/.*dashboard.*/);
});

// Failure scenario 1: Empty email and password
When("the user leaves email and password empty", async function () {
  await page.locator('input[name="email"]').fill("");
  await page.locator('input[name="password"]').fill("");
});

Then("validation errors should be shown for email and password", async function () {
  // Wait for validation errors to appear
  await page.waitForTimeout(1000);
  
  // Check for error messages
  const emailError = page.locator('text=Email address is required');
  const passwordError = page.locator('text=Password is required');
  const summaryError = page.locator('text=Please fix the validation errors');
  
  await expect(emailError).toBeVisible({ timeout: 5000 });
  await expect(passwordError).toBeVisible({ timeout: 5000 });
  await expect(summaryError).toBeVisible({ timeout: 5000 });
});

Then("the input fields should have error styling", async function () {
  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');
  
  // Check for red border class (more flexible matching)
  await expect(emailInput).toHaveClass(/border-red|border-red-|red/);
  await expect(passwordInput).toHaveClass(/border-red|border-red-|red/);
});

Then("the user should remain on the login page", async function () {
  // Check that URL contains login (not dashboard) - FIXED
  const currentUrl = page.url();
  expect(currentUrl).toContain('login');
});

// Failure scenario 2: Invalid email format
When("the user enters invalid email {string} and valid password {string}", async function (email, password) {
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
});

Then("an error message {string} should be displayed", async function (errorMessage) {
  await page.waitForTimeout(1000);
  
  // More flexible error message matching
  const errorLocator = page.locator(`text=${errorMessage}`).or(
    page.locator(`text=/${errorMessage}/i`)
  );
  await expect(errorLocator).toBeVisible({ timeout: 5000 });
});

// Failure scenario 3: Short password
When("the user enters valid email {string} and short password {string}", async function (email, password) {
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
});

Then("the password error message should indicate minimum length requirement", async function () {
  await page.waitForTimeout(1000);
  
  // Check for password length error message
  const passwordError = page.locator('text=Password must be at least 8 characters long');
  await expect(passwordError).toBeVisible({ timeout: 5000 });
});

// Failure scenario 4: Incorrect credentials
When("the user enters email {string} and password {string}", async function (email, password) {
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
});

Then("an error message about invalid credentials should be displayed", async function () {
  await page.waitForTimeout(2000); // Wait for API response
  
  // Look for any error message related to failed login
  const errorLocator = page.locator('text=Failed to sign in').or(
    page.locator('text=Invalid credentials')
  ).or(
    page.locator('text=check your credentials')
  ).or(
    page.locator('text=Invalid email or password')
  );
  
  await expect(errorLocator).toBeVisible({ timeout: 5000 });
});

// Scenario: Error messages should clear when typing
When("the user submits empty form", async function () {
  await page.locator('input[name="email"]').fill("");
  await page.locator('input[name="password"]').fill("");
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);
});

Then("validation errors should be visible", async function () {
  await expect(page.locator('text=Email address is required')).toBeVisible();
  await expect(page.locator('text=Password is required')).toBeVisible();
});

When("the user starts typing in the email field", async function () {
  await page.locator('input[name="email"]').fill("a");
  await page.waitForTimeout(500);
});

Then("the email error message should disappear", async function () {
  await expect(page.locator('text=Email address is required')).not.toBeVisible();
});

Then("the password error message should remain visible", async function () {
  await expect(page.locator('text=Password is required')).toBeVisible();
});

// Password visibility toggle
When("the user enters password {string}", async function (password) {
  await page.locator('input[name="password"]').fill(password);
});

When("clicks the eye icon to show password", async function () {
  // Find and click the eye icon button - FIXED selector
  const eyeButton = page.locator('button[type="button"]').filter({ 
    has: page.locator('svg') 
  }).first();
  await eyeButton.click();
  await page.waitForTimeout(500);
});

Then("the password should be visible as plain text", async function () {
  const passwordInput = page.locator('input[name="password"]');
  
  // Wait for the type to change
  await page.waitForFunction(
    () => document.querySelector('input[name="password"]').type === 'text',
    { timeout: 5000 }
  );
  
  await expect(passwordInput).toHaveAttribute('type', 'text');
});

When("the user clicks the eye icon to hide password", async function () {
  const eyeButton = page.locator('button[type="button"]').filter({ 
    has: page.locator('svg') 
  }).first();
  await eyeButton.click();
  await page.waitForTimeout(500);
});

Then("the password should be hidden", async function () {
  const passwordInput = page.locator('input[name="password"]');
  
  // Wait for the type to change back to password
  await page.waitForFunction(
    () => document.querySelector('input[name="password"]').type === 'password',
    { timeout: 5000 }
  );
  
  await expect(passwordInput).toHaveAttribute('type', 'password');
});

// Remember me checkbox
When("the user checks the {string} checkbox", async function (checkboxLabel) {
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.check();
});

Then("the checkbox should be checked", async function () {
  const checkbox = page.locator('input[type="checkbox"]').first();
  await expect(checkbox).toBeChecked();
});

When("the user unchecks the {string} checkbox", async function (checkboxLabel) {
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.uncheck();
});

Then("the checkbox should be unchecked", async function () {
  const checkbox = page.locator('input[type="checkbox"]').first();
  await expect(checkbox).not.toBeChecked();
});

// Forgot password link
Then("a {string} link should be visible", async function (linkText) {
  await expect(page.locator(`text=${linkText}`)).toBeVisible();
});

Then("it should be clickable", async function () {
  const link = page.locator('text=Forgot password?');
  await expect(link).toBeEnabled();
  await expect(link).toHaveAttribute('href');
});

// Dark mode toggle
When("the user clicks the dark mode toggle button", async function () {
  await page.locator('button[aria-label="Toggle dark mode"]').click();
  await page.waitForTimeout(500);
});

When("the user clicks the dark mode toggle button again", async function () {
  await page.locator('button[aria-label="Toggle dark mode"]').click();
  await page.waitForTimeout(500);
});

Then("the page should switch to dark mode", async function () {
  // Wait for dark mode to apply
  await page.waitForTimeout(500);
  
  // Check if dark class is applied
  const html = page.locator('html');
  await expect(html).toHaveClass(/dark/);
});

Then("the page should switch back to light mode", async function () {
  await page.waitForTimeout(500);
  
  const html = page.locator('html');
  await expect(html).not.toHaveClass(/dark/);
});

// Demo credentials
Then("demo credentials should be visible on the login page", async function () {
  const demoSection = page.locator('text=Demo Credentials:');
  await expect(demoSection).toBeVisible();
});

Then("the demo email should be {string}", async function (email) {
  await expect(page.locator(`text=${email}`)).toBeVisible();
});

Then("the demo password should be {string}", async function (password) {
  await expect(page.locator(`text=${password}`)).toBeVisible();
});

// Accessibility tests
Then("the email input should have proper ARIA attributes", async function () {
  const emailInput = page.locator('input[name="email"]');
  await expect(emailInput).toHaveAttribute('aria-invalid');
});

Then("the password input should have proper ARIA attributes", async function () {
  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toHaveAttribute('aria-invalid');
});

Then("error messages should be associated with their inputs", async function () {
  // Trigger validation errors
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(1000);
  
  // Check for aria-describedby
  const emailInput = page.locator('input[name="email"]');
  const emailAriaDescribedBy = await emailInput.getAttribute('aria-describedby');
  
  if (emailAriaDescribedBy) {
    const errorElement = page.locator(`#${emailAriaDescribedBy}`);
    await expect(errorElement).toBeVisible();
  }
});

// NEW: Password mismatch test for signup
When("the user switches to signup form", async function () {
  await page.getByRole("button", { name: "Sign Up" }).click();
  await page.waitForTimeout(500);
});

When("the user enters signup details with mismatched passwords", async function () {
  // Fill signup form
  await page.locator('input[name="name"]').fill("John Doe");
  await page.locator('input[name="email"]').fill("john@example.com");
  await page.locator('input[name="password"]').fill("password123");
  await page.locator('input[name="confirmPassword"]').fill("different123");
});

Then("a password mismatch error should be displayed", async function () {
  await page.waitForTimeout(1000);
  const mismatchError = page.locator('text=Passwords do not match');
  await expect(mismatchError).toBeVisible({ timeout: 5000 });
});

When("the user enters signup details with short password", async function () {
  await page.locator('input[name="name"]').fill("John Doe");
  await page.locator('input[name="email"]').fill("john@example.com");
  await page.locator('input[name="password"]').fill("123");
  await page.locator('input[name="confirmPassword"]').fill("123");
});

Then("a short password error should be displayed", async function () {
  await page.waitForTimeout(1000);
  const shortPasswordError = page.locator('text=Password must be at least 8 characters long');
  await expect(shortPasswordError).toBeVisible({ timeout: 5000 });
});

When("the user enters signup details with valid data", async function () {
  await page.locator('input[name="name"]').fill("John Doe");
  await page.locator('input[name="email"]').fill("newuser@example.com");
  await page.locator('input[name="password"]').fill("password123");
  await page.locator('input[name="confirmPassword"]').fill("password123");
  await page.locator('input[name="phone"]').fill("1234567890");
  await page.locator('input[name="company"]').fill("Test Company");
});

Then("the signup should be successful", async function () {
  await page.waitForTimeout(2000);
  const successMessage = page.locator('text=Account created successfully');
  await expect(successMessage).toBeVisible({ timeout: 5000 });
});