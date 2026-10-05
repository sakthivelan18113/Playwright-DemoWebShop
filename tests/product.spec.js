const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');

test.describe('Products', () => {
  test('should open Simple Computer product', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');

    await expect(product.productTitle).toContainText('Simple Computer');
    await expect(product.price).toBeVisible();
  });

  test('should add a product to cart', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');
    await product.addToCart();
    await home.openCart();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('input[name="removefromcart"]')).toHaveCount(1);
  });
});