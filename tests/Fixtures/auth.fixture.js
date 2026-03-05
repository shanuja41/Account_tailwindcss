import { test as base, expect } from "@playwright/test";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    // ---------- SETUP ----------
    await page.goto("/login");
    await page.fill('input[name="email"]', "admin@example.com");
    await page.fill('input[name="password"]', "password");
    await page.click('button[type="submit"]');
    
    // Wait for navigation to complete
    await page.waitForURL(/dashboard/, { timeout: 10000 });
    
    // Wait for the actual application to load - look for header element
    await page.waitForSelector('header', { state: 'attached', timeout: 10000 });
    
    console.log("Setup completed: User logged in");

    // Create a wrapper function that includes teardown
    const wrappedPage = {
      page,
      async logout() {
        console.log("Logging out user...");
        
        try {
          // Navigate to dashboard with proper wait conditions
          await page.goto("/dashboard", { 
            timeout: 30000, 
            waitUntil: 'networkidle' 
          });
          
          // Wait for the application to be fully loaded
          // First wait for the header to be present
          await page.waitForSelector('header', { 
            state: 'attached', 
            timeout: 15000 
          });
          
          // Wait for any loading states to disappear
          await page.waitForTimeout(2000);
          
          // Now look for the profile toggle with multiple strategies
          console.log("Looking for profile toggle...");
          
          // Try different selectors
          const profileToggle = await page.waitForSelector('[data-testid="profile-toggle"], button[aria-label="Profile menu"], .profile-toggle', { 
            state: 'visible', 
            timeout: 15000 
          });
          
          if (!profileToggle) {
            throw new Error("Profile toggle not found");
          }
          
          console.log("Profile toggle found, clicking...");
          await profileToggle.click();
          
          // Wait for dropdown to appear
          await page.waitForTimeout(1000);
          
          // Look for logout button
          console.log("Looking for logout button...");
          const logoutBtn = await page.waitForSelector('[data-testid="logout-btn"], button:has-text("Logout")', { 
            state: 'visible', 
            timeout: 10000 
          });
          
          if (!logoutBtn) {
            throw new Error("Logout button not found");
          }
          
          console.log("Logout button found, clicking...");
          await logoutBtn.click();
          
          // Wait for navigation to login page
          await page.waitForURL(/login/, { timeout: 10000 });
          
          console.log("Logout completed");
        } catch (error) {
          console.error("Logout failed:", error);
          
          // Take screenshot for debugging
          await page.screenshot({ path: 'logout-failure.png' });
          
          // Log the current URL and page title
          console.log("Current URL:", page.url());
          console.log("Page title:", await page.title());
          
          throw error;
        }
      }
    };

    // Provide the wrapped page to tests
    await use(wrappedPage);

    console.log("Test completed, page will close");
  },
});

export { expect };