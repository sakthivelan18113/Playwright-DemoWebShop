class BasePage {
  constructor(page) {
    this.page = page;
  }

  async open(path = '/') {
    await this.page.goto(path);
  }

  async waitForPage() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator) {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  async fill(locator, value) {
    await locator.fill(value);
  }

  async getText(locator) {
    return (await locator.innerText()).trim();
  }
}

module.exports = { BasePage };