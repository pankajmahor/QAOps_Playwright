const { expect } = require('@playwright/test');
class Cartpage {

    constructor(page) {
        this.page = page;
        this.firstProductDisplay = page.locator('div li').first()
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }
    async verifyProductDisplay(productName) {
        await this.firstProductDisplay.waitFor();
        const bool = await this.getproductlocator(productName).isVisible();
        expect(bool).toBeTruthy();
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }
    getproductlocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}
module.exports = { Cartpage };
