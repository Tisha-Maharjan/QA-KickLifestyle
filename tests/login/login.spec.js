const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
import { LoginPage } from "../../pageObjects/login.po.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Valid Login tests", () => {
  test.skip("valid login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.Email, testData.validUser.Password);
    await login.verifyValidLogin();
  });
});

test.describe("Invalid Login Test", () => {
  test.describe.configure({ mode: "serial" });
  test("invalid email invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.InvalidEmail,
      testData.invalidUser.InvalidPassword
    );
    await login.verifyInvalidEmailPassword();
  });

  test("Invalid Email Valid Password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.InvalidEmail,
      testData.invalidUser.Password
    );
    await login.verifyInvalidEmailPassword();
  });

  test("Valid Email Invalid Password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.Email,
      testData.invalidUser.InvalidPassword
    );
    await login.verifyInvalidEmailPassword();
  });

  test("no email no password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.EmptyEmail,
      testData.invalidUser.EmptyPassword
    );
    await login.verifyEmptyEmail();
  });

  test("no email valid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.EmptyEmail,
      testData.invalidUser.Password
    );
    await login.verifyEmptyEmail();
  });

  test("valid email no password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.Email,
      testData.invalidUser.EmptyPassword
    );
    await login.verifyEmptyPassword();
  });

  test("no email invalid password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.EmptyEmail,
      testData.invalidUser.InvalidPassword
    );
    await login.verifyEmptyEmail();
  });

  test("invalid email no password", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.InvalidEmail,
      testData.invalidUser.EmptyPassword
    );
    await login.verifyEmptyPassword();
  });
});

// test.afterEach(async ({ page }) => {
//   await page.close();
// });
