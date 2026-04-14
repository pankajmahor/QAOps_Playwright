const { test, expect } = require('@playwright/test');

test('Client App login', async ({ page }) => {

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
    await page.locator('.card-body b').first().waitFor();
// commit changes
    const count = await products.count();
    console.log(count);

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).getByText('Add To Cart').click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();

    expect(bool).toBeTruthy();

    //await page.locator("button:has-text('Checkout')").click();    
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.locator("[placeholder*='Select Country']").pressSequentially('ind', { delay: 150 });
    const dropdown = page.locator('.ta-results');

    await dropdown.locator('button').first().waitFor();
    const optincount = await dropdown.locator('button').count();
    console.log(optincount);

    for (let i = 0; i < optincount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect( page.locator('.user__name [type="text"]').first()).toHaveText('sa.johngrey@gmail.com');

    await page.evaluate(() => window.scrollBy(0, 500));

    await page.locator('a:has-text("PLACE ORDER")').click();
    await page.pause();

    await expect(page.locator("h1:has-text('THANKYOU FOR THE ORDER.')")).toHaveText('Thankyou for the order.');

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator('[routerlink*="myorders"]').first().click();

    await page.locator('tbody').first().waitFor();
    const rows = await page.locator('tbody tr').count();
    console.log(rows);  

    for(let i=0; i<rows; i++){
        const rowOrderID = await page.locator('tbody tr').nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderID)){
            await page.locator('tbody tr').nth(i).locator('button').first().click();
            break;
        }       

    }
    const orderdetailid = await page.locator('.col-text.-main').textContent();
    console.log(orderdetailid);
    expect(orderId.includes(orderdetailid)).toBeTruthy();


});