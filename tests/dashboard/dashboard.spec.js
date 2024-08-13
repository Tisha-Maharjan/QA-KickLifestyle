const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");

const { LoginPage } = require("../../pageObjects/login.po.js");
const { DashboardPage } = require("../../pageObjects/dashboard.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.addStyleTag({
    content: "* { transition: none !important; animation: none !important; }",
  });

  const login = new LoginPage(page);
  await login.login(testData.validUser.Email, testData.validUser.Password);
  await login.verifyValidLogin();
});

test.afterEach(async ({ page }) => {
  const logout = new DashboardPage(page);
  await logout.logoutOperation();
});

test.describe("Dashboard CRUD", () => {
  test.describe.configure({ mode: "serial" });
  test("Add item", async ({ page }) => {
    const dashboard = new DashboardPage(page);

    await dashboard.addToCart("Shopping Cart");
    await dashboard.removeItem();
  });

  test("Multiple Add", async ({ page }) => {
    const multipleAdd = new DashboardPage(page);
    await multipleAdd.addMultipleItem();
  });

  test("Search Items", async ({ page }) => {
    const search = new DashboardPage(page);
    await search.searchOperation("kick nekxa");
  });
});

// test.describe("Search Operation", () => {
//   test.only("Search Items", async ({ page }) => {
//     const search = new DashboardPage(page);
//     await search.searchOperation("kick nekxa");
//   });
// });
