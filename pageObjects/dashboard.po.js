const { expect } = require("@playwright/test");

let count = 0;
let cross = 1;

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logo =
      '//*[@id="page-header-inner"]/div[2]/div/div[1]/div/div[2]/div/a/m-image/img';
    // this.imgClick =
    //   '//*[@id="post-327"]/div/div[3]/div/div[2]/div/div/div/div[1]/div[1]/div[1]/div[2]/a/div[2]/m-image/img';
    this.imgClick = '(//div[contains(@class, "product-main-image")])[1]';
    this.add = "(//span[contains(text(),'Add to cart')])[1]";
    this.cartMsg = '//h3[contains(text(),"Shopping Cart")]';
    this.increaseitem =
      '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';

    this.remove = '//a[contains(text(),"Remove")]';
    this.emptyCart = '//h2[contains(text(),"Your cart is currently empty.")]';
    this.crossButton = '//*[@id="btn-close-fly-cart"]';
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
  }

  async addMultipleItem() {
    await this.page.locator(this.logo).click();
    await this.page.locator(this.imgClick).click();
    await this.page.waitForTimeout(2000);
    for (let i = 1; i <= 3; i++) {
      await this.page.locator(this.add).click();
      count++;
      while (cross < 3) {
        await this.page.locator(this.crossButton).click();
        cross++;
        break;
      }
    }
    await this.page.waitForTimeout(3000);

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
  }
};
