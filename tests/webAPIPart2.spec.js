const { test, expect } = require('@playwright/test');

let webcontext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const email = 'sa.johngrey@gmail.com';
    const pass = 'Test@4321';
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');

    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator('#login');

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await username.fill('sa.johngrey@gmail.com');
    await password.fill('Test@4321');
    await loginButton.click();
    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });
    webcontext = await browser.newContext({ storageState: 'state.json' });



});

test('Test Case 1', async () => {

    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    const products = page.locator('.card-body');
    await page.locator('.card-body b').first().waitFor();

    const count = await products.count();
    console.log(count);


});

test('Test Case 2', async () => {

    const page = await webcontext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    const products = page.locator('.card-body');

    await page.locator('.card-body b').first().waitFor();

    const count = await products.count();
    console.log(count);


});