const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { validUser } = require('../fixtures/testData');

test.describe('Registration', () => {
  test('should show validation for invalid email', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.gotoRegister();

    await register.male.check();
    await register.firstName.fill('Test');
    await register.lastName.fill('User');
    await register.email.fill('invalid-email');
    await register.password.fill('Test@12345');
    await register.confirmPassword.fill('Test@12345');
    await register.registerButton.click();

    await expect(register.validationSummary).toBeVisible();
  });

  test('should register a new user with unique email', async ({ page }) => {
    const register = new RegisterPage(page);
    await register.gotoRegister();
    await register.register(validUser);

    await expect(register.result).toContainText(/registration completed/i);
  });
});