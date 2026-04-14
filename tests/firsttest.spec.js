const { test, expect } = require('@playwright/test');



test('first test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.google.com/');
    await console.log("Hello World");
    await console.log('This is my first test')
});

test('Validating error message', async ({ page }) => {

    const usename = page.locator('#username');
    const password = page.locator('[type="password"]');
    const signInBtn = page.locator('#signInBtn');
    const sdropdown = page.locator("select.form-control");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // await page.pause();
    await usename.fill("rahulshettyacademy");
    await page.locator("#signInBtn").click();
    console.log(await page.locator('#login-form').locator('div').nth(0).textContent());

    expect(page.locator('#login-form').locator('div').nth(0)).toContainText("Empty username/password");

    await usename.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await sdropdown.selectOption("consult");

    await page.locator('.radiotextsty').last().click();
       await page.locator('#okayBtn').click();
        
       console.log(await page.locator('.radiotextsty').last().isChecked());
        await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
     expect(await page.locator('#terms').isChecked()).toBeFalsy();


     const documentlink = page.locator("[href*='documents-request']");
     console.log(await documentlink.textContent());
     await expect(documentlink).toHaveAttribute("class","blinkingText");

    await page.pause();
    await signInBtn.click();

    console.log(await page.locator('.card-body a').first().textContent());
    console.log(await page.locator('.card-body a').nth(2).textContent());
    console.log(await page.locator('.card-body a').last().textContent());

    await page.locator('.card-body a').last().waitFor();

    const allproducts=await page.locator('.card-body a').allTextContents();
    console.log(allproducts);

})

test('Second Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await console.log("This is my second test");


});

test.only('WindowHandle',async({browser})=>{

    
    const context = await browser.newContext();
    const page = await context.newPage();

    const usename = page.locator('#username');
    const documentlink = page.locator("[href*='documents-request']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

   const[newPage]= await Promise.all([
    context.waitForEvent('page'),
    await documentlink.click(),
    ]);

    const text = await newPage.locator('.red').textContent();
    console.log(text);

    const arraytext =  text.split('@');
    const domain =  arraytext[1].split(' ')[0];
    console.log(domain);
 await usename.fill(domain);
   await page.pause();
  const text2 = await page.locator('#username').inputValue();
    console.log(text2);


   

   


});

test('Login to site', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await usename.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    await page.pause();


}
);