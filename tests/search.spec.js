const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');

test.describe('Search', () => {
  test('should search for computer products', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);

    await home.gotoHome();
    await home.search('computer');

    await expect(search.pageTitle).toContainText(/search/i);
    await expect(search.productItems.first()).toBeVisible();
    expect(await search.productCount()).toBeGreaterThan(0);
  });

  test('should return no products for an unlikely search term', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.search('xyz-no-product-987654321');

    await expect(page.locator('.search-results')).toBeVisible();
  });
});