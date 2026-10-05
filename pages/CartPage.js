const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartRows = page.locator('input[name="removefromcart"]');
    this.updateCart = page.locator('input[name="updatecart"]');
    this.removeCheckboxes = page.locator('input[name="removefromcart"]');
    this.continueShopping = page.getByRole('button', { name: /Continue shopping/i });
    this.terms = page.locator('#termsofservice');
    this.checkoutButton = page.locator('#checkout');
    this.cartTotal = page.locator('.cart-total .order-total .product-price');
    this.emptyMessage = page.locator('.order-summary-content');
  }

  async removeAllItems() {
    const count = await this.removeCheckboxes.count();
    if (!count) return;
    for (let i = 0; i < count; i++) {
      await this.removeCheckboxes.nth(i).check();
    }
    await this.updateCart.click();
    await this.waitForPage();
  }

  async proceedToCheckout() {
    if (await this.terms.isVisible().catch(() => false)) {
      await this.terms.check();
    }
    await this.checkoutButton.click();
    await this.waitForPage();
  }

  async itemCount() {
    return await this.cartRows.count();
  }
}

module.exports = { CartPage };