// @ts-check
import { defineConfig, devices } from '@playwright/test';


const config=({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 30*1000  //Timeout for expect assertions
      }, 
  reporter: 'html',
  
  use: {

    browserName: 'chromium',
    headless: false,   // To run tests in headed mode
   screenshot: 'on',       //screeenshot only on test failure
    video: 'on',            //Record video only on test failure
    trace: 'retain-on-failure',           //Record trace only on test failure
  },

  
}); module.exports = config;

