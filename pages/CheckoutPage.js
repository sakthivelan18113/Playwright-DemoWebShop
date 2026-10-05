const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.billingCountry = page.locator('#BillingNewAddress_CountryId');
    this.billingCity = page.locator('#BillingNewAddress_City');
    this.billingAddress = page.locator('#BillingNewAddress_Address1');
    this.billingZip = page.locator('#BillingNewAddress_ZipPostalCode');
    this.billingPhone = page.locator('#BillingNewAddress_PhoneNumber');

    this.billingContinue = page.locator('input[onclick*="Billing.save"]');
    this.shippingContinue = page.locator('input[onclick*="Shipping.save"]');
    this.shippingMethodContinue = page.locator('input[onclick*="ShippingMethod.save"]');
    this.paymentMethodContinue = page.locator('input[onclick*="PaymentMethod.save"]');
    this.paymentInfoContinue = page.locator('input[onclick*="PaymentInfo.save"]');
    this.confirmOrder = page.locator('input[onclick*="ConfirmOrder.save"]');

    this.orderSuccess = page.locator('.section.order-completed');
  }

  async fillBillingAddress(address) {
    if (await this.billingCountry.isVisible().catch(() => false)) {
      const options = await this.billingCountry.locator('option').evaluateAll(opts =>
        opts.map(o => ({ value: o.value, text: o.textContent.trim() }))
      );
      const match = options.find(o => /India/i.test(o.text));
      if (match) await this.billingCountry.selectOption(match.value);
    }

    if (await this.billingCity.isVisible().catch(() => false)) {
      await this.billingCity.fill(address.city);
      await this.billingAddress.fill(address.address1);
      await this.billingZip.fill(address.zip);
      await this.billingPhone.fill(address.phone);
    }
  }

  async continueIfVisible(locator) {
    if (await locator.isVisible().catch(() => false)) {
      await locator.click();
      await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    }
  }

  async completeCheckout(address) {
    await this.fillBillingAddress(address);
    await this.continueIfVisible(this.billingContinue);

    await this.continueIfVisible(this.shippingContinue);
    await this.continueIfVisible(this.shippingMethodContinue);
    await this.continueIfVisible(this.paymentMethodContinue);
    await this.continueIfVisible(this.paymentInfoContinue);
    await this.continueIfVisible(this.confirmOrder);
  }

  async isOrderCompleted() {
    return await this.orderSuccess.isVisible().catch(() => false);
  }
}

module.exports = { CheckoutPage };