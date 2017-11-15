import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {ProductService} from "../Services/product.service";
import {ReceiptService} from "../Services/receipt.service";
import {ReceiptproductService} from "../Services/receiptproduct.service";
import {Receipt} from "../Models/receipt";
import {ReceiptProduct} from "../Models/receipt-product";

@Component({
  selector: 'app-receipt-create',
  templateUrl: './receipt-create.component.html',
  styleUrls: ['./receipt-create.component.css']
})
export class ReceiptCreateComponent implements OnInit {

  private receipt: Receipt;
  private shops: any;
  private products: ReceiptProduct[];

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    private receiptService: ReceiptService,
    private receiptProductService: ReceiptproductService) { }

  ngOnInit() {
    this.shopService.getShops().then(response=>this.shops = response)
  }

  private addProduct(id:number, name: string, amount: number, price: number)
  {
      this.products.push(new ReceiptProduct(id,name,amount,price,amount*price));
  }

  private save()
  {

  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }
}


