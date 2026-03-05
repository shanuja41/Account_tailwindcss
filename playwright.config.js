// playwright.config.js (ESM)
import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30_000,
  use: {
    baseURL: "http://localhost:5173",
    headless: false,
    launchOptions: { slowMo: 1000 },
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  reporter: [["html", { open: "never" }]],
});