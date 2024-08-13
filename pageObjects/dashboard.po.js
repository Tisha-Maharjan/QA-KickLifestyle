const { expect } = require("@playwright/test");

let count = 0;
let cross = 1;

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logo =
      '//*[@id="page-header-inner"]/div[2]/div/div[1]/div/div[2]/div/a/m-image/img';
    this.imgClick = '(//div[contains(@class, "product-main-image")])[1]';
    this.add = "(//span[contains(text(),'Add to cart')])[1]";
    this.cartMsg = '//h3[contains(text(),"Shopping Cart")]';
    this.increaseitem =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';

    this.remove = '//a[contains(text(),"Remove")]';
    this.emptyCart = '//h2[contains(text(),"Your cart is currently empty.")]';
    this.crossButton = '//*[@id="btn-close-fly-cart"]';

    this.searchBtn =
      '(//div[contains(@class, "header-wrap")])/div[3]/div[1]/a[2]';
    this.searchItem =
      '//*[@id="popup-search"]/div/div[1]/div[2]/div[2]/div/form/input';
    this.searchResult =
      '(//div[contains(@class, "product-info")])[1]/div[1]/h3';
    this.logoutDirect =
      '//*[@id="page-header-inner"]/div[2]/div/div[3]/div/a[1]';
    this.logout = '//*[@id="post-971"]/div/div/div[1]/div/nav/ul/li[5]/a';
    this.confirmLogout = '//*[@id="error-page"]/div/p[2]/a';

    this.logoutMsg = '//*[@id="customer_login"]/div[1]/div/h2';
  }

  async addToCart(message) {
    await this.page.locator(this.logo).click();
    await this.page.locator(this.imgClick).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.add).click();
    await this.page.locator(this.increaseitem).click();
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator(this.cartMsg)).toHaveText(message);
  }

  async removeItem() {
    await this.page.locator(this.remove).click();
    await expect(this.page.locator(this.emptyCart)).toHaveText(
      "Your cart is currently empty."
    );
    await this.page.locator(this.crossButton).click();
  }

  async addMultipleItem() {
    await this.page.locator(this.logo).click();
    await this.page.locator(this.imgClick).click();
    await this.page.waitForTimeout(1000);
    for (let i = 1; i <= 3; i++) {
      await this.page.locator(this.add).click();
      count++;
      while (cross < 3) {
        await this.page.locator(this.crossButton).click();
        cross++;
        break;
      }
    }
    await this.page.waitForTimeout(1000);

    const inputElement = this.page
      .locator(".quantity .input-text.qty.text")
      .nth(1);
    const value = await inputElement.inputValue();
    console.log(value);
    if (count == value) {
      console.log("Test Successful!");
    } else {
      console.log("Test Failed!");
    }
    await this.page.locator(this.crossButton).click();
  }

  async searchOperation(item) {
    await this.page.locator(this.searchBtn).click();
    await this.page.locator(this.searchItem).fill(item);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.searchItem).press("Enter");
    await this.page.waitForTimeout(2000);
    const searchResultText = await this.page
      .locator(this.searchResult)
      .innerText();
    console.log("Search Result Text:", searchResultText);

    if (searchResultText.toLowerCase().includes(item.toLowerCase())) {
      console.log("Result found.");
    } else {
      console("Error!");
    }
  }

  async logoutOperation() {
    await this.page.locator(this.logoutDirect).click();
    await this.page.locator(this.logout).click();
    // await this.page.locator(this.confirmLogout).click();
    await expect(this.page.locator(this.logoutMsg)).toHaveText("Sign In");
  }
};
