const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Shopping Cart', () => {
  test('should add and remove a product from cart', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');
    await product.addToCart();

    await home.openCart();
    await expect(page).toHaveURL(/cart/);
    expect(await cart.itemCount()).toBeGreaterThan(0);

    await cart.removeAllItems();
    await expect(page.locator('.order-summary-content')).toContainText(/empty|no items/i);
  });

  test('should show cart page from home page', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.openCart();
    await expect(page).toHaveURL(/cart/);
  });
});