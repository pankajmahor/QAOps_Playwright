const { test, expect } = require('@playwright/test');

const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder :{
        email: "sa.johngrey@gmail.com",
        pass: "Test@4321",
        productName: "ZARA COAT 3"
        }
    }
)