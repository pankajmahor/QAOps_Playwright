// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';


const config = ({
  testDir: './tests',
  retries : 2,                    // if test fails, it will retry 2 times before marking it as failed
  timeout: 30 * 1000,
  expect: {
    timeout: 30 * 1000  //Timeout for expect assertions
  },
  reporter: 'html',

  projects: [
    {
      name: 'chromium',
        use: {

        browserName: 'chromium',
        headless: false,   // To run tests in headed mode
        screenshot: 'on',       //screeenshot only on test failure
        video: 'on',            //Record video only on test failure
        trace: 'retain-on-failure',           //Record trace only on test failure
      //  ignoreHTTPSErrors: true,       // allow sssl certification errors
      //  permissions: ['geolocation'],   // allow location prompt
        viewport : { width: 720, height: 720 },    // set custom window size
        //...devices['Desktop Chrome'],
       
      }
    },
    {
      name: 'safari',
      use: {

        browserName: 'webkit',
        headless: false,   // To run tests in headed mode
        screenshot: 'on',       //screeenshot only on test failure
        video: 'off',            //Record video only on test failure
        trace: 'retain-on-failure',           //Record trace only on test failure
        
        //...devices['iPhone 11 Pro Max landscape'],
      }

    }

  ]



}); module.exports = config;

