import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ReceiptService} from "../Services/receipt.service";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {log} from "util";
import {ShopService} from "../Services/shop.service";
import {ReceiptProductService} from "../Services/receiptproduct.service";
import {ProductService} from "../Services/product.service";

@Component({
  selector: 'app-receipt-details',
  templateUrl: './receipt-details.component.html',
  styleUrls: ['./receipt-details.component.css']
})
export class ReceiptDetailsComponent implements OnInit {

  private isDataLoaded: boolean;
  private receipt: any;
  removeDialogDisplay:boolean =false;

  constructor(
    private productService: ProductService,
    private receiptProductService: ReceiptProductService,
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.route.paramMap
      .switchMap((params: ParamMap) => this.receiptService.getReceipt(+params.get('id')))
      .subscribe((receipt) => {
        this.receipt = receipt;
        this.getReceiptDate();
        this.getShopName();
        this.getReceiptProducts();
        this.getTotalValue();
        this.isDataLoaded = true;
    });
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
      product.totalValue = product.amount * product.price;
    }
  }

  private getTotalValue() {
    this.receiptService.getReceiptTotalValue(this.receipt.id).then(responce=>this.receipt.totalValue = responce);
  }

  private goEdit() {
    this.router.navigate(['/receipt-edit', this.receipt.id]);
  }

  private onDelete() {
    this.removeDialogDisplay = true;
  }

  onRemoveConfirm()
  {
    this.receiptService.removeReceipt(this.receipt.id);
    this.location.back();
  }
}
