import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReceiptService} from "../Services/receipt.service";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {log} from "util";
import {ShopService} from "../Services/shop.service";
import {ReceiptProductService} from "../Services/receiptproduct.service";
import {ProductService} from "../Services/product.service";
import {UserInfoService} from "../Services/user-id.service";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {

  public currency:string;
  public width: number;
  public height:number;
  public isDataLoaded: boolean;
  public receipt: any;
  public removeDialogDisplay:boolean =false;

  constructor(
    private productService: ProductService,
    private receiptProductService: ReceiptProductService,
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private userService:UserInfoService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void{
    this.checkUser();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.receiptService.getReceipt(+params.get('id')))
      .subscribe((receipt) => {
        this.receipt = receipt;
        this.getReceiptDate();
        this.getShopName();
        this.getReceiptProducts();
        this.getTotalValue();
        this.getUSerCurrency();
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

  goBack(): void {
    this.location.back();
  }

  private getReceiptDate() {
    this.receipt.purchaseDate = new Date(this.receipt.purchaseDate).toLocaleDateString();
  }

  private getShopName() {
    this.shopService.getShop(this.receipt.shopID).then(shop=>this.receipt.shopName = shop.name)
  }

  private getReceiptProducts() {
    this.receiptProductService.getReceiptProductByReceipt(this.receipt.id).then((response)=>{
      this.receipt.receiptProducts = response;
      this.getProductsName();
      this.getProductsValue();
    });
  }

  private getProductsName() {
    for(let product of this.receipt.receiptProducts)
    {
        this.productService.getProduct(product.productID).then(response=>product.product = response.name);
    }
  }

  private getProductsValue() {
    for(let product of this.receipt.receiptProducts)
    {
      product.totalValue = +(product.amount * product.price).toFixed(2);
    }
  }

  private getTotalValue() {
    this.receiptService.getReceiptTotalValue(this.receipt.id).then(responce=>this.receipt.totalValue = +(responce).toFixed(2));
  }

  public goEdit() {
    this.router.navigate(['/receipt-edit', this.receipt.id]);
  }

  public onDelete() {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { content: 'receipt-yousure',header:'receipt-remove'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.onRemoveConfirm();
      }
    });
  }

  onRemoveConfirm()
  {
    this.receiptService.removeReceipt(this.receipt.id);
    this.location.back();
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
