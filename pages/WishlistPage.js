const { BasePage } = require('./BasePage');

class WishlistPage extends BasePage {
  constructor(page) {
    super(page);

    this.wishlistRows = page.locator('.cart-item-row');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.updateWishlist = page.locator('input[name="updatecart"]');
    this.emptyMessage = page.locator('.wishlist-content');
  }

  async itemCount() {
    return await this.wishlistRows.count();
  }

  async removeAll() {
    const count = await this.removeCheckboxes.count();
    for (let i = 0; i < count; i++) {
      await this.removeCheckboxes.nth(i).check();
    }
    if (count) {
      await this.updateWishlist.click();
      await this.waitForPage();
    }
  }
}

module.exports = { WishlistPage };