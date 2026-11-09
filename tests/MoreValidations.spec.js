const {test,expect} = require('@playwright/test');
//test.describe.configure({mode:'parallel'})
test.describe.configure({mode:'serial'})
test('PopUp validations',async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//await page.goto("https://google.com");
//await page.goBack; //click to back button
//await page.goForward;
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("hide-textbox").click();
await expect(page.locator("#displayed-text")).toBeHidden();
await page.pause();

//handle dialog 
page.on('dialog',dialog => dialog.accept());
await page.locator("#confirmbtn").click();
await page.locator("#mousehover").hover();


//frames handling 
const FramePage = page.frameLocator("#courses-iframe");
FramePage.locator("li a[href*='lifetime-access']:visible").click(); //3 elemst with this locator - 1 is visible 
const textCheck = await FramePage.locator(".text h2").textContent();
console.log(textCheck.split('')[1]);


})


test('Screenshot and visual comparison',async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screencast({path: 'Partialscreenshot.pgn'}); //take a scr on locator
await page.locator("hide-textbox").click();
await page.screencast({path: 'screenshot.pgn'}); //- take a scr on page
await expect(page.locator("#displayed-text")).toBeHidden();
})
 
test('viasual',async({page})=>{

await page.goto("https://www.google.com/")
expect(await page.screenshot()).toMatchSnapshot('landing.png');


})
