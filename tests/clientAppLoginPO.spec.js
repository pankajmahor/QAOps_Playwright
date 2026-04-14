const { test, expect } = require('@playwright/test');
const { customtest } = require('../Utils/test-base');
const { POManager } = require('../pageobjects/POManager');


const dataSet = JSON.parse(JSON.stringify(require('../Utils/placeorderTestData.json')));

for(const data of dataSet) {
test(`@Web Client App login ${data.email}`, async ({ page }) => {

    const pomanager = new POManager(page);
    
    const lognpage = pomanager.getLoginPage();
    await lognpage.goTo();
    await lognpage.validlogin(data.email, data.pass);

    const dashboardpage = pomanager.getDashboardPage();
    await dashboardpage.searchProductAddCart(data.productName);
    await dashboardpage.navigateToCartPage();

    const cartpage = pomanager.getCartPage();
    await cartpage.verifyProductDisplay(data.productName);
    await cartpage.clickCheckout();

    const getOrderReviewPage = pomanager.getOrderReviewPage();
    await getOrderReviewPage.searchCountryAndSelect('ind', 'India');

    const orderId = await getOrderReviewPage.submitandgetOrderId(data.email);
    console.log(orderId);
    await dashboardpage.navigatetoOrdersPage();

    const orderHistoryPage = pomanager.getOrderHistoryPage();
    await orderHistoryPage.verifyOrderDisplay(orderId);

    expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();


});
}

customtest(`@web1 Test with predefined test data`, async ({ page, testDataForOrder }) => {

    const pomanager = new POManager(page);
    
    const lognpage = pomanager.getLoginPage();
    const dashboardpage = pomanager.getDashboardPage();
    const cartpage = pomanager.getCartPage();

    await lognpage.goTo();
    await lognpage.validlogin(testDataForOrder.email, testDataForOrder.pass);
    await dashboardpage.searchProductAddCart(testDataForOrder.productName);
    await dashboardpage.navigateToCartPage();

    await cartpage.verifyProductDisplay(testDataForOrder.productName);
    await cartpage.clickCheckout();
});

