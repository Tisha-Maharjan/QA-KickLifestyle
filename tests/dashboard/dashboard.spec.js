const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");

const { LoginPage } = require("../../pageObjects/login.po.js");
const { DashboardPage } = require("../../pageObjects/dashboard.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(testData.validUser.Email, testData.validUser.Password);
  await login.verifyValidLogin();
});

test.describe("Dashboard CRUD", () => {
  test("Add item", async ({ page }) => {
    const dashboard = new DashboardPage(page);

    // await dashboard.practiceMessage("Practice");
    // // await dashboard.practiceMessage();
    // await dashboard.TestException("Test Exceptions");

    // await dashboard.CRUD_Operation("Row 2 was added");

    // await dashboard.addItem(addData.additem.food);
  });
});
