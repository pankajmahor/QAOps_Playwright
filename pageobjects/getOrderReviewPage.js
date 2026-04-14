const { expect } = require("@playwright/test");

class GetOrderReviewPage {

    constructor(page) {
        this.page = page;
        this.dropdown = page.locator("[placeholder*='Select Country']");
        this.dropdownResults = page.locator('.ta-results');
        this.emailLocator = page.locator('.user__name [type="text"]').first();
       this.placeorder = page.locator('a:has-text("PLACE ORDER")');
       this.thankyouHeader = page.locator("h1:has-text('THANKYOU FOR THE ORDER.')");
       this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');

    }

   async searchCountryAndSelect(countryname, countryToSelect) {

    await this.dropdown.pressSequentially(countryname, { delay: 150 });

     //const dropdown = this.page.locator('.ta-results');

    await this.dropdownResults.locator('button').first().waitFor();
    const optincount = await this.dropdownResults.locator('button').count();
    console.log(optincount);

    for (let i = 0; i < optincount; i++) {
        const text = await this.dropdownResults.locator("button").nth(i).textContent();
        if (text.trim() === countryToSelect) {
            await this.dropdownResults.locator("button").nth(i).click();
            break;
        }
    }
    }

    async submitandgetOrderId(email){

        await expect( this.emailLocator).toHaveText(email);
        
            await this.page.evaluate(() => window.scrollBy(0, 500));
        
            await this.placeorder.click();
            await this.page.pause();
        
            await expect(this.thankyouHeader).toHaveText('Thankyou for the order.');
        
            const orderId = await this.orderId.textContent();
            return orderId;


}
}
module.exports = { GetOrderReviewPage };