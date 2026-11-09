import { test, expect } from '@playwright/test';
 
test('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5s default timeout for expect assretions 
   await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});//will fail if the text is not visible 
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
});

test('Playwright test level time out', async ({ page }) => {
    test.setTimeout(6000);
    const slowExpect = expect.configure({timeout:9000})//test level 
    page.setDefaultTimeout(6000); // test level 

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button",{name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //5s default timeout for expect assretions 
   await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();//-step level 
   
   await page.getByRole("link",{name : "Shop"}).click();

    await expect(page.locator(".my-4").first()).toHaveText("Shop");
     await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});