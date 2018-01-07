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

@Component({
  selector: 'app-receipt-create',
  templateUrl: './receipt-create.component.html',
  styleUrls: ['./receipt-create.component.css'],
})
export class ReceiptCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private shopService: ShopService,
    private productService: ProductService,
    private receiptService: ReceiptService,
    private receiptProductService: ReceiptProductService,
    private categoryService: CategoryService,
    private userService: UserInfoService) { }


  private width: number;
  private height:number;
  private receipt: Receipt;
  private shops: any;
  private newProducts: ReceiptProduct[];

  private products: any;
  private categories: any;
  multiSelectCategories: SelectItem[];
  currentProduct : ReceiptProduct;

  newProductName: string;
  newProductCategories: number[];

  newProduct: boolean = false;
  productDialogDisplay: boolean = false;
  shopDialogDisplay: boolean = false;

  receiptTotal: number = 0;
  receiptShop: number;
  receiptDate: Date;

  private currency:string;

  ngOnInit() {
    this.checkUser();
    this.getWidthAndHeight();
    this.currentProduct = new ReceiptProduct();
    this.newProducts = [];
    this.multiSelectCategories = [];
    this.newProductCategories = [];
    this.receiptDate = new Date();
    this.getUSerCurrency();
    this.getShops();
    this.getProducts();
    this.getCategories();
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

  addProduct()
  {
    if(this.newProduct)
    {
      this.productService.createProduct(this.newProductName,this.newProductCategories).then((response)=>{
        this.currentProduct.Name = this.newProductName;
        this.currentProduct.ID = parseInt(response);
        this.afterCreateProduct();
      })
    }
    else {
      this.getProductName().then(()=>{
        this.afterCreateProduct();
      });
    }
  }

  private afterCreateProduct()
  {
    this.currentProduct.TotalValue = this.currentProduct.Amount * this.currentProduct.Price;
    this.newProducts.push(this.currentProduct);
    this.currentProduct = new ReceiptProduct();
    this.newProductCategories = [];
    this.newProductName = '';
    this.productDialogDisplay = false;
    this.updateTotal();
  }
  private getProductName() {
    return this.productService.getProduct(this.currentProduct.ID).then(response=>this.currentProduct.Name = response.name);
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

  updateTotal(): any {
    let total = 0;
    for (let product of this.newProducts)
    {
      total += (product.Price * product.Amount);
    }
    this.receiptTotal = total;
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


