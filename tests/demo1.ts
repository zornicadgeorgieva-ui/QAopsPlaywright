import {expect, type Locator,type Page} from '@playwright/test';


let message1:string = "Hello";
message1 = "bye";
let age1: number = 20;
let isActive:boolean = false;

let numberArray :number[] = [1,2,3];
let data: any = "anything"
data = 42;
//function
function add1(a:number,b:number):number
{
    return a+b;
}
add1(3,4)

//object 
let user1:{name:string,age:number,location:string} = {name:"Bob", age: 25,location:"Bg"};
user1.location = "Sofia"

//class
class CartPage{
     page: Page;
cartProducts: Locator;
productsText: Locator;



    constructor(page:any){
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }
    async verifyProductIsDsiplayed(productName){

    await this.cartProducts.waitFor();
   const bool = this.getProductLocator(productName).isVisible();
   expect(bool).toBeTruthy();

    }
    async Checkout()
{
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};
