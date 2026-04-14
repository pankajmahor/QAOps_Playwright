const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');

const loginPayload = { userEmail: "sa.johngrey@gmail.com", userPassword: "Test@4321" };

const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };
const fakeResponse = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiRequest = await request.newContext();
    const apiUtils = new APIUtils(apiRequest, loginPayload);

    // Order API
    response = await apiUtils.createOrder(orderPayload);



});

test('Client App login', async ({ page }) => {

    const email = 'sa.johngrey@gmail.com';
    const pass = 'Test@4321';
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');


    await page.addInitScript(value => { window.localStorage.setItem('token', value); }, response.token);

    await page.goto('https://rahulshettyacademy.com/client');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
           const respon =await  page.request.fetch(route.request());
            let body = JSON.stringify(fakeResponse);
            route.fulfill({
                respon,
                body
            });
            //   //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
        });


    console.log('***************************************************************************');


    await page.locator('[routerlink*="myorders"]').first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());




});