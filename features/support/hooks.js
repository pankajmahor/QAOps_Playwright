const {Before,After,BeforeStep,AfterStep,Status} = require("@cucumber/cucumber");
const { POManager } = require('../../pageobjects/POManager');
const playwright =  require('@playwright/test');
const path = require("node:path");

Before({tags:"@foo or @Regression"},async function () {
  const browser = await playwright.chromium.launch({headless : false});
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pomanager = new POManager(this.page);
});

BeforeStep(function() {
});

AfterStep (async function ({result}){
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path:'screenshot2.png'});
    }
});

After (async function (){
    console.log("I am Last to Execute");
});