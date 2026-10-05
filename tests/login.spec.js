const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { loginUser } = require('../fixtures/testData');

test.describe('Login', () => {
  test('should display login page', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLogin();
    await expect(page).toHaveURL(/login/);
    await expect(login.email).toBeVisible();
    await expect(login.password).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login('invalid@example.test', 'WrongPassword@123');

    await expect(login.validationSummary).toBeVisible();
  });

  test('valid login - run when DWS_EMAIL and DWS_PASSWORD are supplied', async ({ page }) => {
    test.skip(!loginUser.email || !loginUser.password, 'Set DWS_EMAIL and DWS_PASSWORD to run this test.');
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login(loginUser.email, loginUser.password);
    await expect(login.logoutLink).toBeVisible();
  });
});