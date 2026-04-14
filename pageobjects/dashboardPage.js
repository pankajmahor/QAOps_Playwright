

class DashboardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator('.card-body');
        this.producttext = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
        this.myOrders = page.locator('[routerlink*="myorders"]').first();
    }

    async searchProductAddCart(productName) {

        await this.page.locator('.card-body b').first().waitFor();
        const allproducts = await this.producttext.allTextContents();
        const count = await this.products.count();
        console.log(count);

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).getByText('Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCartPage() {
        await this.cart.click();
    }

    async navigatetoOrdersPage() {
        await this.myOrders.click();
    }
}


module.exports = { DashboardPage }; 