
const {LoginPage} = require('../pageObjects/LoginPage');
const {DashboardPage} = require('../pageObjects/DashboardPage');

class POManagers{

    constructor(page)
    {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);

    }
    getLoginPage(){
        return this.loginPage;
    }

    getDasboardPage(){
        return this.dashboardPage;
    }

}
module.exports = {POManagers};