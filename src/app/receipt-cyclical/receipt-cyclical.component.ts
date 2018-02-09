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
import {WarningDialogComponent} from "../dialogs/warning-dialog/warning-dialog.component";

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


  public width: number;
  public height:number;
  public shops: any;
  public newProducts: ReceiptProduct[];
  public currency: string;
  public currentProduct : ReceiptProduct;

  public receiptTotal: number = 0;
  public receiptShop: number;
  public receiptStartDate: Date;
  public minEndDate: Date;
  public receiptEndDate: Date;
  public receiptCycle: number = 1;

  ngOnInit() {
    this.checkUser();
    this.currentProduct = new ReceiptProduct();
    this.newProducts = [];
    this.shops = [];
    this.receiptStartDate = new Date();
    this.receiptEndDate = new Date();
    this.receiptEndDate.setMonth(this.receiptStartDate.getMonth()+1);
    this.minEndDate = new Date();
    this.minEndDate.setDate(this.receiptStartDate.getDate()+1);
    this.getWidthAndHeight();
    this.getShops(false);
    this.getUserCurrency();
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
    this.currentProduct.TotalValue = +(this.currentProduct.Amount * this.currentProduct.Price).toFixed(2);
    this.newProducts.push(this.currentProduct);
    this.currentProduct = new ReceiptProduct();
    this.updateTotal();
  }

  save()
  {
    let receipt = new ReceiptCyclicalCreate();
    receipt.ShopId = this.receiptShop;

    let startoffset = this.receiptStartDate.getTimezoneOffset()*60000;
    let startdate = new Date(this.receiptStartDate);
    startdate.setTime(startdate.getTime()-startoffset);
    receipt.StartDate = startdate.toISOString();

    let endoffset = this.receiptEndDate.getTimezoneOffset()*60000;
    let enddate = new Date(this.receiptEndDate);
    enddate.setTime(enddate.getTime()-endoffset);
    receipt.EndDate = enddate.toISOString();

    if(receipt.EndDate<receipt.StartDate)
    {
      this.openDialog();
      return;
    }
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
    this.receiptService.createReceiptCyclical(receipt)
      .then(response=>this.goMainpage())
      .catch(reason => this.openDialog());
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
    this.receiptTotal = +total.toFixed(2);
  }
  private updateProductValues(product: ReceiptProduct)
  {
    this.checkAmount(product);
    this.checkPrice(product);
    product.TotalValue= product.Amount * product.Price;
    this.updateTotal();
  }


  checkAmount(product: ReceiptProduct){
    if(product.Amount<=0){
      product.Amount=1;
    }
  }


  private checkPrice(product: ReceiptProduct) {
    if(product.Price<=0){
      product.Price=1;
    }
  }

  private getUserCurrency() {
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

  updateMinDate() {
    console.log("weszlo");
    this.minEndDate.setDate(this.receiptStartDate.getDate()+1);
    if(this.receiptEndDate<this.minEndDate)
    {
      this.receiptEndDate.setDate(this.minEndDate.getDate());
    }
  }

  private openDialog() {
    this.dialog.open(WarningDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: 'common-error'
    });
  }
}
