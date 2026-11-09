const {test, expect, request} = require ('@playwright/test');
const { APiUtils } = require('./utils/APIUtils');

const loginPayload = {userEmail:"zstest@yopmail.com",userPassword:"Test12345!"};
const orderPayload = {orders:[{country:"Bulgaria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll (async ()=>
{
const apiContext = await request.newContext();//new instance is created
const apiUtils = new APiUtils(apiContext,loginPayload);
response = await apiUtils.createOrder(orderPayload);

});


test ('Place the order',async ({page})=>
{

    page.addInitScript(value =>
        { 
        window.localStorage.setItem('token',value);
        }, response.token);

    page.goto("https://rahulshettyacademy.com/client/");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

        async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });//via fulfill - sent the response to the browser 
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
   
    

   await page.locator("button[routerlink*='myorders']").click();
    
     await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());



});