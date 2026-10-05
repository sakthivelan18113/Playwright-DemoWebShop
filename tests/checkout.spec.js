const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchPage } = require('../pages/SearchPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { address } = require('../fixtures/testData');

test.describe('Checkout', () => {
  test('guest checkout should redirect to login when required', async ({ page }) => {
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');
    await product.addToCart();
    await home.openCart();

    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/login|checkout/);
  });

  test('checkout page can be opened after login', async ({ page }) => {
    test.skip(!process.env.DWS_EMAIL || !process.env.DWS_PASSWORD,
      'Set DWS_EMAIL and DWS_PASSWORD for the authenticated checkout test.');

    const { LoginPage } = require('../pages/LoginPage');
    const login = new LoginPage(page);
    const home = new HomePage(page);
    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await login.gotoLogin();
    await login.login(process.env.DWS_EMAIL, process.env.DWS_PASSWORD);

    await home.gotoHome();
    await home.search('computer');
    await search.openProduct('Simple Computer');
    await product.addToCart();
    await home.openCart();
    await cart.proceedToCheckout();

    await expect(page).toHaveURL(/checkout/);
    await checkout.fillBillingAddress(address);
  });
});