class LoginPage {

    constructor(page){
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.userName = page.locator("#username");
        this.passwsord = page.locator("[type='password']");

    }
     
    goTo(){
        this.page.goTo("https://rahulshettyacademy.com/client/");
    }
    

    async validLogin(username,password)
    { 

    await this.userName.type(username);
    await this.passwsord.type(password);
    await this.signInButton.click();  
    await this.page.waitForLoadState('networkidle');

    }
}
module.exports = {LoginPage};