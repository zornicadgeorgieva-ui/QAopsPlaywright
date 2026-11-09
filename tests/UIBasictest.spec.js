const {test, expect} = require ('@playwright/test');

test ('Browser context PlayWright test',async ({browser})=>
{
    
    //chrome - plugins/cookies
const context = browser.newContext();//new instanse is created 
const page = await context.newPage();//the page is open

//page.route('**/*.css', route => route.abort());//block the css request to reach the browser 
//page.route('**/*.{jpg,png,jpeg}', route => route.abort())
const userName = page.locator("#username");
const signIn = page.locator("#signInBtn");
const cartTitles = page.locator(".card-body a");


 //page.on('request', request => console.log(request.url())); //listen to request calls events to occured 
//page.on('response', response => console.log(response.url(),response.status()));

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await userName.fill("ztest@yopmail.com");
await page.locator("[type='password']").fill("Learning@830$3mK2");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill(""); //clear info at the field 
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await cartTitles.first().textContent());//take the first element 
console.log(await cartTitles.nth(1).textContent());
const allTitles = await cartTitles.allTextContents();
console.log(allTitles);

});

test ('UI Controls',async ({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const userName = page.locator("#username");
const signIn = page.locator("#signInBtn");
const documentLink = page.locator("[href*='documents-request']");

//dropdowns handling
const dropDown = page.locator("select .form-control")
await dropDown.selectOption('consult');
//await page.pause();
//radio buttons handling
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
//assretion
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click(); 
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
await expect(page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLink).toHaveAttribute("class","blinkingText");


});

test('@Child windows hadl', async ({browser})=>
 {
    const context = await browser.newContext();
    const page =  await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
 
    const [newPage]=await Promise.all(
   [
      context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
      documentLink.click(),
   
   ])//new page is opened
   
 
   const  text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain =  arrayText[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
 
 });