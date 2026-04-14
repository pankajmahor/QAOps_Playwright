const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('A login to Ecommerce application with {string} and {string}', async function (username, password) {
  // Write code here that turns the phrase above into concrete actions

  const lognpage = this.pomanager.getLoginPage();
  await lognpage.goTo();
  await lognpage.validlogin(username, password);
});


When('Add {string} to cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  this.dashboardpage = this.pomanager.getDashboardPage();
  await this.dashboardpage.searchProductAddCart(productName);
  await this.dashboardpage.navigateToCartPage();
});

Then('verify {string} is displayed in the cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartpage = this.pomanager.getCartPage();
  await cartpage.verifyProductDisplay(productName);
  await cartpage.clickCheckout();
});


When('enter valid details and Place the order {string}', async function (useremail) {
  // Write code here that turns the phrase above into concrete actions
  const getOrderReviewPage = this.pomanager.getOrderReviewPage();
  await getOrderReviewPage.searchCountryAndSelect('ind', 'India');

  this.orderId = await getOrderReviewPage.submitandgetOrderId(useremail);
  console.log(this.orderId);
});

Then('verify order in order history page', async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardpage.navigatetoOrdersPage();

  const orderHistoryPage = this.pomanager.getOrderHistoryPage();
  await orderHistoryPage.verifyOrderDisplay(this.orderId);

  expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

Given('A login to Ecommerce2 application with {string}', async function (username) {
  // Write code here that turns the phrase above into concrete actions
     const usename = this.page.locator('#username');
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // await page.pause();
    await usename.fill(username);
    await this.page.locator("#signInBtn").click();
   

});


Then('verify error message', async function () {
  // Write code here that turns the phrase above into concrete actions
 console.log(await this.page.locator('#login-form').locator('div').nth(0).textContent());

    expect(this.page.locator('#login-form').locator('div').nth(0)).toContainText("Empty username/password");
});

