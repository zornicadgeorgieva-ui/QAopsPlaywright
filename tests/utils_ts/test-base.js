


import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder :    {
    "username" : "zstest@yopmail.com",
        "password" : "Test12345!",
            "productName" : "ZARA COAT 3"
    
    }

}

)

/*const {base} = require ('@playwright/test');

exports.customtest = base.test.extend(
    {
    testDataForOrder: {
    "username" : "zstest@yopmail.com",
        "password" : "Test12345!",
            "productName" : "ZARA COAT 3"

}

    }
)*/