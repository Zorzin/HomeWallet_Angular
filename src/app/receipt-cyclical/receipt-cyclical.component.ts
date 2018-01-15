import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {ReceiptService} from '../Services/receipt.service';
import {ReceiptProduct} from '../Models/receipt-product';
import {ReceiptProductPost} from "../Models/receipt-product-post";
import {ReceiptCyclicalCreate} from "../Models/receipt-cyclical-create";
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";
import {ShopCreateDialogComponent} from "../dialogs/shop-create-dialog/shop-create-dialog.component";
import {ProductAddDialogComponent} from "../dialogs/product-add-dialog/product-add-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-receipt-cyclical',
  templateUrl: './receipt-cyclical.component.html',
  styleUrls: ['./receipt-cyclical.component.css']
})
export class ReceiptCyclicalComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private userService: UserInfoService,
    private router: Router,
    public dialog: MatDialog) { }


  private width: number;
  private height:number;
  private shops: any;
  private newProducts: ReceiptProduct[];
  private currency: string;
  private currentProduct : ReceiptProduct;

  private receiptTotal: number = 0;
  private receiptShop: number;
  private receiptStartDate: Date;
  private receiptEndDate: Date;
  private receiptCycle: number = 1;

  ngOnInit() {
    this.checkUser();
    this.currentProduct = new ReceiptProduct();
    this.newProducts = [];
    this.shops = [];
    this.receiptStartDate = new Date();
    this.receiptEndDate = new Date();
    this.receiptEndDate.setMonth(this.receiptStartDate.getMonth()+1);
    this.getWidthAndHeight();
    this.getShops(false);
    this.getUSerCurrency();
    this.updateTotal();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  removeProduct(id: number)
  {
    let rem = this.newProducts.find(m=>m.ID == id);
    let index = this.newProducts.indexOf(rem);
    this.newProducts.splice(index,1);
    this.updateTotal();
  }

  private afterCreateProduct()
  {
    this.currentProduct.TotalValue = this.currentProduct.Amount * this.currentProduct.Price;
    this.newProducts.push(this.currentProduct);
    this.currentProduct = new ReceiptProduct();
    this.updateTotal();
  }

  save()
  {
    let receipt = new ReceiptCyclicalCreate();
    receipt.ShopId = this.receiptShop;
    receipt.StartDate = this.receiptStartDate.toLocaleDateString();
    receipt.EndDate = this.receiptEndDate.toLocaleDateString();
    receipt.Cycle = this.receiptCycle;
    receipt.Products = [];
    for(let product of this.newProducts)
    {
      let receiptProduct= new ReceiptProductPost();
      receiptProduct.Amount = product.Amount;
      receiptProduct.Price = product.Price;
      receiptProduct.ProductId = product.ID;
      receipt.Products.push(receiptProduct);
    }
    this.receiptService.createReceiptCyclical(receipt).add(this.goMainpage());;
  }


  showProductDialog() {
    let dialogRef = this.dialog.open(ProductAddDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.currentProduct = result;
        this.afterCreateProduct();
      }
    });
  }


  showShopDialog() {
    let dialogRef = this.dialog.open(ShopCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops(result?true:false);
    });
  }

  getShops(newShop:boolean)
  {
    this.shopService.getShops().then((response)=>{
      for (let shop of response)
      {
        let item:any = {};
        item.value = shop.id;
        item.label = shop.name;
        this.shops.push(item);
      }
      if(newShop){
        this.receiptShop = this.shops[this.shops.length-1].value;
      }
      else{
        this.receiptShop = this.shops[0].value;
      }
    })
  }

  updateTotal(): any {
    let total = 0;
    for (let product of this.newProducts)
    {
      total += (product.Price * product.Amount);
    }
    this.receiptTotal = total;
  }
  private updateProductValues(product: ReceiptProduct)
  {
    product.TotalValue= product.Amount * product.Price;
    this.updateTotal();
  }

  private getUSerCurrency() {
    this.userService.getUserCurrency().then((response)=>{
      this.currency = JSON.parse(response);
    });
  }

  onCancel()
  {
    this.router.navigate(['/receipts']);
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private goMainpage() {
    setTimeout(()=>{this.router.navigate(['/receipts']);},500);
  }

  checkCycle(){
    if(this.receiptCycle<=0){
      this.receiptCycle=1;
    }
  }

}
