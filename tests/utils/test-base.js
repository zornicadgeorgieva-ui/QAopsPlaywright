const {base} = require ('@playwright/test');

exports.customtest = base.test.extend(
    {
    testDataForOrder: {
    "username" : "zstest@yopmail.com",
        "password" : "Test12345!",
            "productName" : "ZARA COAT 3"

}

    }
)