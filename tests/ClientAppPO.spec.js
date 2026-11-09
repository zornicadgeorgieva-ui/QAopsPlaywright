const {test, expect} = require ('@playwright/test');
const {customtest} = require("./utils/test-base")
 const {POManagers} = require('../pageObjects/POManagers');
//JSON -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/placeordersTestData.json")));


for(const data of dataSet){
test ('@web Client app login for ${data.productname}',async ({page})=>
{
   const poManagers = new POManagers(page);

   const products = page.locator(".card-body");
    const loginPage = poManagers.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(data.username,data.password);

   const dashboardPage = poManagers.getDasboardPage(); 
   await dashboardPage.searchProduct(data.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();

   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
   
   
});
customtest('Client app login',async ({page,testDataForOrder})=>{
    const poManagers = new POManagers(page);

   const products = page.locator(".card-body");
    const loginPage = poManagers.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);

   const dashboardPage = poManagers.getDasboardPage(); 
   await dashboardPage.searchProduct(testDataForOrder.productName);
   await dashboardPage.navigateToCart();

   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});
}