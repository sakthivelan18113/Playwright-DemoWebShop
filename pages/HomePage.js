const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.cartLink = page.getByRole('link', { name: /Shopping cart/i });
    this.wishlistLink = page.getByRole('link', { name: /Wishlist/i });
    this.searchBox = page.locator('#small-searchterms');
    this.searchButton = page.locator('input.search-box-button');
    this.categoryLinks = page.locator('.listbox .list a');
    this.featuredProducts = page.locator('.product-grid .product-item');
  }

  async gotoHome() {
    await this.open('/');
  }

  async search(term) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
    await this.waitForPage();
  }

  async openCategory(category) {
    await this.page.getByRole('link', { name: category, exact: true }).first().click();
    await this.waitForPage();
  }

  async openCart() {
    await this.cartLink.first().click();
    await this.waitForPage();
  }

  async openWishlist() {
    await this.wishlistLink.click();
    await this.waitForPage();
  }
}

module.exports = { HomePage };