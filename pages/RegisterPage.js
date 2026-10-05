const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);

    this.male = page.locator('#gender-male');
    this.female = page.locator('#gender-female');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.result = page.locator('.result');
    this.validationSummary = page.locator('.validation-summary-errors');
  }

  async gotoRegister() {
    await this.open('/register');
  }

  async register(user, gender = 'male') {
    if (gender === 'female') {
      await this.female.check();
    } else {
      await this.male.check();
    }

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    await this.registerButton.click();
    await this.waitForPage();
  }
}

module.exports = { RegisterPage };