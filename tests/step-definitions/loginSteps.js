import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium } from "playwright";
import { expect } from "@playwright/test";

setDefaultTimeout(10 * 1000); // 10s

let browser;
let page;

Given("the user is on the login page", async function () {
  browser = await chromium.launch({ headless: false, slowMo: 300 });
  const context = await browser.newContext();
  page = await context.newPage();

  await page.goto("http://localhost:5173/login", {
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
});

When("the user enters valid email and password", async function () {
  await page.locator('input[name="email"]').fill("admin@example.com");
  await page.locator('input[name="password"]').fill("password");
});

When("clicks the login button", async function () {
  await page.locator('button[type="submit"]').click();
});

Then("the dashboard should be displayed", async function () {
  await expect(page).toHaveURL(/dashboard/);
  await browser.close();
});