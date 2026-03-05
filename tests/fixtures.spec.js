import { test, expect } from "./Fixtures/auth.fixture";

test("Open All Income page using Fixture login (Setup/Teardown)", async ({ loggedInPage }) => {

  await loggedInPage.goto("/income/all");

  await expect(loggedInPage.locator("table")).toBeVisible();

});