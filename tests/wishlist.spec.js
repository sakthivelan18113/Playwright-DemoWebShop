const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { WishlistPage } = require('../pages/WishlistPage');

test.describe('Wishlist', () => {
  test('should open wishlist page', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.openWishlist();
    await expect(page).toHaveURL(/wishlist/);
  });

  test('should add a product to wishlist', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const wishlist = new WishlistPage(page);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');
    await product.addToWishlist();

    await home.openWishlist();
    await expect(page).toHaveURL(/wishlist/);
    expect(await wishlist.itemCount()).toBeGreaterThan(0);
  });
});