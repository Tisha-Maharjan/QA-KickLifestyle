const { expect } = require("@playwright/test");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.logo =
      '//*[@id="page-header-inner"]/div[2]/div/div[1]/div/div[2]/div/a/m-image/img';
    this.imgClick =
      '//*[@id="post-327"]/div/div[3]/div/div[2]/div/div/div/div[1]/div[1]/div[1]/div[2]/a/div[2]/m-image/img';
    this.add = "(//span[contains(text(),'Add to cart')])[1]";
    // this.addbtn = "add-to-cart";
    // this.addbtn = '//*[@id="product-2440"]/div/div/div/div/div[2]/div[4]/div/form/div/button[1]';
    this.cartMsg = '//h3[contains(text(),"Shopping Cart")]';
    // this.increaseitem =
    //   '//*[@id="popup-fly-cart"]/div/div[1]/div[1]/div[2]/div[1]/div[2]/ul/li/div[2]/div[2]/div/div/button[2]';
    // this.itemCount = '//*[@id="quantity_668e9cf5024aa"]';
    this.remove = '//a[contains(text(),"Remove")]';
    this.emptyCart = '//h2[contains(text(),"Your cart is currently empty.")]';
  }

  async addToCart(message) {
    await this.page.locator(this.logo).click();
    await this.page.locator(this.imgClick).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.add).click();
    // await this.page.getByRole("button", { name: this.add }).click();

    await expect(this.page.locator(this.cartMsg)).toHaveText(message);
  }
  async removeItem() {
    await this.page.locator(this.remove).click();
    await expect(this.page.locator(this.emptyCart)).toHaveText(
      "Your cart is currently empty."
    );
  }
};
