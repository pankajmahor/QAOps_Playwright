
class OrderHistoryPage {

    constructor(page) {
        this.page = page;
        this.orderRows = page.locator('tbody tr');
        this.orderid = page.locator('.col-text.-main');
    }

    async verifyOrderDisplay(orderId) {

        await this.page.locator('tbody').first().waitFor();
        const rows = await this.orderRows.count();
        console.log(rows);

        for (let i = 0; i < rows; i++) {
            const rowOrderID = await this.orderRows.nth(i).locator('th').textContent();
            if (orderId.includes(rowOrderID)) {
                await this.orderRows.nth(i).locator('button').first().click();
                break;
            }
        }
    }

    async getOrderId() {

        const orderdetailid = await this.orderid.textContent();
        console.log(orderdetailid);
        return orderdetailid;
    }
}
module.exports = { OrderHistoryPage };  