const { LoginPage } = require('../pageobjects/loginPage');
const { DashboardPage } = require('../pageobjects/dashboardPage');
const { Cartpage } = require('../pageobjects/cartPage');
const { GetOrderReviewPage } = require('../pageobjects/getOrderReviewPage');
const {OrderHistoryPage} = require('../pageobjects/orderHistoryPage');

class POManager {

    constructor(page) {

        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new Cartpage(page);
        this.OrderReviewPage = new GetOrderReviewPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    
    getDashboardPage() {
        return this.dashboardPage;  
    }
    getCartPage(){
        return this.cartPage;
    }   
    getOrderReviewPage(){
        return this.OrderReviewPage;
    }
    getOrderHistoryPage(){
        return this.orderHistoryPage;
    }   
}

module.exports = { POManager };