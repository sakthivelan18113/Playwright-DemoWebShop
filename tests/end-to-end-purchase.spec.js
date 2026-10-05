const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { address } = require('../fixtures/testData');

test.describe('End-to-End Purchase', () => {
  test('login -> search -> product -> cart -> checkout -> order', async ({ page }) => {
    test.skip(!process.env.DWS_EMAIL || !process.env.DWS_PASSWORD,
      'Set DWS_EMAIL and DWS_PASSWORD before running the complete purchase test.');

    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.gotoLogin();
    await login.login(process.env.DWS_EMAIL, process.env.DWS_PASSWORD);
    await expect(login.logoutLink).toBeVisible();

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');

    await expect(product.productTitle).toContainText('Simple Computer');

    await product.addToCart();
    await home.openCart();

    expect(await cart.itemCount()).toBeGreaterThan(0);

    await cart.proceedToCheckout();
    await expect(page).toHaveURL(/checkout/);

    await checkout.completeCheckout(address);

    await expect(page.locator('body')).toContainText(/order|thank you/i);
  });
});