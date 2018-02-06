import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReceiptService} from "../Services/receipt.service";
import {ShopService} from "../Services/shop.service";
import {ReceiptProductService} from "../Services/receiptproduct.service";
import {ProductService} from "../Services/product.service";
import { Location } from '@angular/common';
import {ReceiptProduct} from "../Models/receipt-product";
import {SelectItem} from "primeng/primeng";
import {CategoryService} from "../Services/category.service";
import {ReceiptProductEdit} from "../Models/receipt-product-edit";
import {UserInfoService} from "../Services/user-id.service";
import {ShopCreateDialogComponent} from "../dialogs/shop-create-dialog/shop-create-dialog.component";
import {ProductAddDialogComponent} from "../dialogs/product-add-dialog/product-add-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-receipt-edit',
  templateUrl: './receipt-edit.component.html',
  styleUrls: ['./receipt-edit.component.css']
})
export class ReceiptEditComponent implements OnInit {

  public currency:string;
  public width: number;
  public height:number;
  public isDataLoaded: boolean;
  public receipt: any;
  public shops:any;
  public receiptProducts:ReceiptProductEdit[];
  public currentNewProduct : ReceiptProductEdit;

  constructor(
    private productService: ProductService,
    private receiptProductService: ReceiptProductService,
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserInfoService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void{
    this.checkUser();
    this.receiptProducts = [];
    this.currentNewProduct = new ReceiptProductEdit();

    this.route.paramMap
      .switchMap((params: ParamMap) => this.receiptService.getReceipt(+params.get('id')))
      .subscribe((receipt) => {
        this.receipt = receipt;
        this.shops = [];
        this.getReceiptDate();
        this.getShopName();
        this.getReceiptProducts();
        this.getTotalValue();
        this.getShops(false);
        this.getUserCurrency();
        this.getWidthAndHeight();
        this.isDataLoaded = true;
      });
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private getReceiptDate() {
    this.receipt.purchaseDate = new Date(this.receipt.purchaseDate);
  }

  private getShopName() {
    this.shopService.getShop(this.receipt.shopID).then(shop=>this.receipt.shopName = shop.name)
  }

  private getReceiptProducts() {
    this.receiptProductService.getReceiptProductByReceipt(this.receipt.id).then((response)=>{
      this.getReceiptProductsFromResponse(response);
    });
  }

  private getTotalValue() {
    this.receiptService.getReceiptTotalValue(this.receipt.id).then(responce=>this.receipt.totalValue = responce);
  }

  deleteProduct(index:number)
  {
    console.log(this.receiptProducts[index].productId);
      this.receiptProducts.splice(index,1);
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
        this.receipt.ShopId = this.shops[this.shops.length-1].value;
      }
      else{
        this.receipt.ShopId = this.shops[0].value;
      }
    })
  }

  private afterCreateProduct()
  {
    this.currentNewProduct.total = this.currentNewProduct.amount * this.currentNewProduct.price;
    this.currentNewProduct.receiptProductId = -1;
    this.receiptProducts.push(this.currentNewProduct);
    this.currentNewProduct = new ReceiptProductEdit();
    this.updateTotal();
  }

  showProductDialog() {
    let dialogRef = this.dialog.open(ProductAddDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.currentNewProduct = new ReceiptProductEdit();
        this.currentNewProduct.price = result.Price;
        this.currentNewProduct.amount = result.Amount;
        this.currentNewProduct.productName= result.Name;
        this.currentNewProduct.productId = result.ID;
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

  updateTotal(): any {
    let total = 0;
    for (let product of this.receiptProducts)
    {
      total += (product.price * product.amount);
    }
    this.receipt.totalValue = total;
  }

  private getReceiptProductsFromResponse(response: any) {
      for(let receiptProduct of response)
      {
        let receiptProductEdit = new ReceiptProductEdit();
        receiptProductEdit.amount = receiptProduct.amount;
        receiptProductEdit.price = receiptProduct.price;
        receiptProductEdit.productId = receiptProduct.productID;
        receiptProductEdit.total = receiptProduct.amount * receiptProduct.price;
        this.productService.getProduct(receiptProduct.productID).then((result)=>receiptProductEdit.productName = result.name);
        receiptProductEdit.receiptProductId = receiptProduct.id;
        this.receiptProducts.push(receiptProductEdit);
      }
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

  private save()
  {
    this.receiptService.updateReceipt(this.receipt,this.receiptProducts).add(this.goMainpage());
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
}
