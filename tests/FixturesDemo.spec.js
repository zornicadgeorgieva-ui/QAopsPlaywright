const {test, expect} = require ('@playwright/test');
const customtest = require("../utils/fixtures.js");



customtest('Fixture demo ',async({authenticatedPage, createOrder,testDataForOrder})=>{

    authenticatedPage.goto("https://rahulshettyacademy.com/client")
    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
   console.log(testDataForOrder.productName);//external data from the fixtures file
//login to app and verify if the order is created


})