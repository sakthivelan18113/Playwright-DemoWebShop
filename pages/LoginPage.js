const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.loginButton = page.locator('input.login-button');
    this.validationSummary = page.locator('.validation-summary-errors');
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }

  async gotoLogin() {
    await this.open('/login');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.waitForPage();
  }

  async isLoggedIn() {
    return await this.logoutLink.isVisible().catch(() => false);
  }
}

module.exports = { LoginPage };