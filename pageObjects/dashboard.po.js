const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logo =
      '//*[@id="page-header-inner"]/div[2]/div/div[1]/div/div[2]/div/a/m-image/img';
  }

  async addToCart() {
    await this.page.locator(this.logo).click();
  }
};
