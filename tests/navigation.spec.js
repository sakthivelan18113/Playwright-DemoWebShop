const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Navigation', () => {
  test('should display main shop categories', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();

    await expect(page.getByRole('link', { name: 'Books', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Computers', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Electronics', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apparel & Shoes', exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Digital downloads', exact: true }).first()).toBeVisible();
  });

  test('should open Books category', async ({ page }) => {
    const home = new HomePage(page);
    await home.gotoHome();
    await home.openCategory('Books');
    await expect(page).toHaveURL(/books/);
  });
});