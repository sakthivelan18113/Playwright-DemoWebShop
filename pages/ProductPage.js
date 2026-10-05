const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    this.productTitle = page.locator('.product-name h1');
    this.price = page.locator('.product-price').first();
    this.addToCartButton = page.locator('input[value="Add to cart"]').first();
    this.addToWishlistButton = page.locator('input[value="Add to wishlist"]').first();
    this.addToCompareButton = page.locator('input[value="Add to compare list"]').first();
    this.processor = page.locator('select[id*="product_attribute"]');
    this.notification = page.locator('#bar-notification');
  }

  async selectFirstOptionIfAvailable() {
    const selects = this.page.locator('select[id*="product_attribute"]');
    const count = await selects.count();
    for(let i = 0; i < count; i++){
      const select=selects.nth(i);

      if(await select.isVisible().catch(()=>false)){
        const options = await select.locator('option').all();

        for(const option of options){
          const value = await option.getAttribute('value');
          const text = (await option.innerText()).trim();

          if(value && !/select|please/i.test(text)){
            await select.selectOption(value);
            break;
          }
        }
      }
    }
    
    }
  

  async addToCart() {
    await this.selectFirstOptionIfAvailable();
console.log('processor/options selected');

    await this.addToCartButton.click();
        await this.page.waitForTimeout(2000);

        const notification = await this.notification.textContent().catch(()=> '');

        console.log('Notification:',notification);

  }

  async addToWishlist() {
    await this.addToWishlistButton.click();
    await this.notification.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
  }
}

module.exports = { ProductPage };