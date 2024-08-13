const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.cross = '//*[@id="modal-promo-popup"]/div[2]/div[1]';
    this.signinLogo = '//*[@id="page-header-inner"]/div[2]/div/div[3]/div/a[1]';
    this.email = '//*[@id="ip_user_login"]';
    this.password = '//*[@id="ip_password"]';
    this.emptyEmail = '//*[@id="ip_user_login-error"]';
    this.emptyPassword = '//*[@id="ip_password-error"]';
    this.loginButton = '//*[@id="minimog-login-form"]/div[5]/button';
    this.validLoginValidation = '//a[contains(text(),"Dashboard")]';

    this.invalidLoginValidation = '//*[@id="minimog-login-form"]/div[4]';
  }

  async login(email, password) {
    // await this.page.locator(this.cross).click();
    await this.page.locator(this.signinLogo).click();
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Dashboard"
    );
  }

  async verifyInvalidEmailPassword() {
    await expect(this.page.locator(this.invalidLoginValidation)).toHaveText(
      "Username or password is wrong. Please try again!"
    );
  }

  async verifyEmptyEmail() {
    await expect(this.page.locator(this.emptyEmail)).toHaveText(
      "This field is required"
    );
  }

  async verifyEmptyPassword() {
    await expect(this.page.locator(this.emptyPassword)).toHaveText(
      "This field is required"
    );
  }
};
