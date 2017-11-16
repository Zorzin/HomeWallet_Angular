import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {ProductService} from "../Services/product.service";
import {ReceiptService} from "../Services/receipt.service";
import {ReceiptproductService} from "../Services/receiptproduct.service";
import {Receipt} from "../Models/receipt";
import {ReceiptProduct} from "../Models/receipt-product";
import {log} from "util";
@Component({
  selector: 'app-receipt-create',
  templateUrl: './receipt-create.component.html',
  styleUrls: ['./receipt-create.component.css'],
})
export class ReceiptCreateComponent implements OnInit {

  private receipt: Receipt;
  private shops: any;
  private newProducts: ReceiptProduct[];
  private products: any;


  newProductId: number;
  newProductName: string;
  newProductAmount: number;
  newProductPrice: number;
  newProduct: boolean = false;

  private receiptProductName: string;


  productDialogDisplay: boolean = false;
  shopDialogDisplay: boolean = false;

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    private receiptService: ReceiptService,
    private receiptProductService: ReceiptproductService) { }

  ngOnInit() {
    this.newProducts = [];
    this.getShops();
    this.getProducts();
  }

  private addProduct()
  {

    log("id:" + this.newProductId);
    log("amount:" + this.newProductAmount);
    log("price:" + this.newProductPrice);
    this.getProductName().then(()=>{
      this.newProducts.push(new ReceiptProduct(this.newProductId,this.receiptProductName ,this.newProductAmount,this.newProductPrice,this.newProductAmount*this.newProductPrice));
    });

  }

  private getProductName() {
    return this.productService.getProduct(this.newProductId).then(response=>this.receiptProductName = response.name);
  }

  save()
  {
  }


  showProductDialog() {
    this.productDialogDisplay = true;
  }

  showShopDialog() {
    this.shopDialogDisplay = true;
  }

  addShop(newShopName: any) {
    this.shopService.createShop(newShopName.value.toString()).add(()=>{this.getShops()});
    this.shopDialogDisplay = false;
  }

  getShops()
  {
    this.shopService.getShops().then(response=>this.shops = response)
  }

  getProducts()
  {
    this.productService.getProducts().then(response=>this.products = response);
  }
}


