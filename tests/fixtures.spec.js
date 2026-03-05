import { test, expect } from "./Fixtures/auth.fixture";

// In your test file
test('Open All Income page using Fixture login', async ({ loggedInPage }) => {
  const { page, logout } = loggedInPage;
  
  // Your test code here using 'page'
  await page.goto("/income");
  // ... test assertions
  
  // Manually logout at the end of your test
  await logout();
});