const { BasePage } = require('./BasePage');

class SearchPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('.page-title');
    this.productItems = page.locator('.product-grid .product-item');
    this.noResults = page.locator('.search-results .result');
  }

  async openProduct(productName) {
    await this.page.getByRole('link', { name: productName, exact: true }).first().click();
    await this.waitForPage();
  }

  async productCount() {
    return await this.productItems.count();
  }
}

module.exports = { SearchPage };