import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {ProductService} from "../Services/product.service";
import {ReceiptService} from "../Services/receipt.service";
import {ReceiptProductService} from "../Services/receiptproduct.service";
import {Receipt} from "../Models/receipt";
import {ReceiptProduct} from "../Models/receipt-product";
import {log} from "util";
import {CategoryService} from "../Services/category.service"
import {SelectItem} from "primeng/primeng";
import {ReceiptCreate} from "../Models/receipt-create";
import {ReceiptProductPost} from "../Models/receipt-product-post";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";
import {MatDialog} from "@angular/material";
import {ProductAddDialogComponent} from "../dialogs/product-add-dialog/product-add-dialog.component";
import {ShopCreateDialogComponent} from "../dialogs/shop-create-dialog/shop-create-dialog.component";

@Component({
  selector: 'app-receipt-create',
  templateUrl: './receipt-create.component.html',
  styleUrls: ['./receipt-create.component.css'],
})
export class ReceiptCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private userService: UserInfoService,
    public dialog: MatDialog) { }


  private currency:string;
  private width: number;
  private height:number;
  private shops: any;
  private newProducts: ReceiptProduct[];
  private currentProduct : ReceiptProduct;
  private receiptTotal: number = 0;
  private receiptShop: number;
  private receiptDate: Date;

  ngOnInit() {
    this.checkUser();
    this.getWidthAndHeight();
    this.currentProduct = new ReceiptProduct();
    this.newProducts = [];
    this.receiptDate = new Date();
    this.getUSerCurrency();
    this.getShops();
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
    let receipt = new ReceiptCreate();
    receipt.ShopId = this.receiptShop;
    receipt.Date = this.receiptDate.toLocaleDateString();
    receipt.Products = [];
    for(let product of this.newProducts)
    {
      let receiptProduct= new ReceiptProductPost();
      receiptProduct.Amount = product.Amount;
      receiptProduct.Price = product.Price;
      receiptProduct.ProductId = product.ID;
      receipt.Products.push(receiptProduct);
    }
    this.receiptService.createReceipt(receipt).add(this.goMainpage());
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
      this.getShops();
    });
  }

  getShops()
  {
    this.shopService.getShops().then(response=>this.shops = response)
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

  private goMainpage() {
    setTimeout(()=>{this.router.navigate(['/receipts']);},500);
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
}


