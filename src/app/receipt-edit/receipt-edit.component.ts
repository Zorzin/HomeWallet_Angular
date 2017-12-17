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

@Component({
  selector: 'app-receipt-edit',
  templateUrl: './receipt-edit.component.html',
  styleUrls: ['./receipt-edit.component.css']
})
export class ReceiptEditComponent implements OnInit {

  private isDataLoaded: boolean;
  private receipt: any;
  private shops:any;
  private categories:any;
  private products:any;
  private receiptProducts:ReceiptProductEdit[];

  multiSelectCategories: SelectItem[];
  currentNewProduct : ReceiptProductEdit;

  newProductCategories: number[];

  newProduct: boolean = false;
  productDialogDisplay: boolean = false;
  shopDialogDisplay: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private receiptProductService: ReceiptProductService,
    private shopService: ShopService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void{
    this.receiptProducts = [];
    this.currentNewProduct = new ReceiptProductEdit();
    this.multiSelectCategories = [];

    this.route.paramMap
      .switchMap((params: ParamMap) => this.receiptService.getReceipt(+params.get('id')))
      .subscribe((receipt) => {
        this.receipt = receipt;
        this.getCategories();
        this.getProducts();
        this.getReceiptDate();
        this.getShopName();
        this.getReceiptProducts();
        this.getTotalValue();
        this.getShops();
        this.isDataLoaded = true;
      });
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

  private getShops() {
    this.shopService.getShops().then((response)=>{
      this.shops = response;
    })
  }

  getCategories()
  {
    this.categoryService.getCategories().then((response)=>{
      this.categories= response;
      for (let category of this.categories)
      {
        let item:any = {};
        item.value = category.id;
        item.label = category.name;
        this.multiSelectCategories.push(item);
      }
    });
  }

  addProduct()
  {
    if(this.newProduct)
    {
        this.productService.createProduct(this.currentNewProduct.productName,this.newProductCategories).then((response)=>{
        this.currentNewProduct.productId = parseInt(response);
        this.afterCreateProduct();
      });
    }
    else {
      this.getProductName().then(()=>{
        this.afterCreateProduct();
      });
    }
  }

  private afterCreateProduct()
  {
    this.currentNewProduct.total = this.currentNewProduct.amount * this.currentNewProduct.price;
    this.currentNewProduct.receiptProductId = -1;
    this.receiptProducts.push(this.currentNewProduct);
    this.currentNewProduct = new ReceiptProductEdit();
    this.newProductCategories = [];
    this.productDialogDisplay = false;
    this.updateTotal();
  }
  private getProductName() {
    return this.productService.getProduct(this.currentNewProduct.productId).then(response=>this.currentNewProduct.productName = response.name);
  }

  getProducts()
  {
    this.productService.getProducts().then(response=>this.products = response);
  }

  showProductDialog() {
    this.productDialogDisplay = true;
  }

  showShopDialog() {
    this.shopDialogDisplay = true;
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

  private updateProductValues(product: ReceiptProductEdit)
  {
    product.total = product.amount * product.price;
    this.updateTotal();
  }

  private save()
  {
    this.receiptService.updateReceipt(this.receipt,this.receiptProducts);
  }
}
