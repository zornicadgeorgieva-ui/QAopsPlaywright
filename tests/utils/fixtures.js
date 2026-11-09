const base = require ('@playwright/test');
const {APiUtils} = require('./APIUtiles.js');
const {request} = require ('@playwright/test');
const loginPayload = {userEmail:"zstest@yopmail.com",userPassword:"Test12345!"};
const orderPayload = {orders:[{country:"Bulgaria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

//via exports get visible 
exports.customtest = base.test.extend(
{
authenticatedPage : async({browser}, use)=>{
    const context =  await browser.newContext();
   const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#username").fill(email);
    await page.locator("[type='password']").fill("Test12345!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    //tear down 
    await context.close(); // will be executed after another fixtures 
},

createOrder: async({},use)=>{
const apiContext = await request.newContext();//new instance is created
const apiUtils = new APiUtils(apiContext,loginPayload);
response = await apiUtils.createOrder(orderPayload);
await use(response);
await apiContext.dispose();


},

testDataForOrder: {

    productName : 'ADIDAS ORIGINAL'
}

}
)