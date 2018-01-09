import { Component, OnInit } from '@angular/core';
import {ProductService} from "../Services/product.service";
import {Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";
import {SelectItem} from "primeng/primeng";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private isDataLoaded:boolean;
  private width:number;
  private height:number;
  products: any;
  newProductName: string;
  newProductCategories: number[];
  multiSelectCategories: SelectItem[];

  private categories: any;
  private displayCreateDialog: boolean;

  constructor(private productService: ProductService,
              private router: Router,
              private categoryService: CategoryService,
              private userService: UserInfoService) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.multiSelectCategories = [];
    this.newProductCategories = [];
    this.getCategories();
    this.GetProducts();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private GetProducts() {
    this.productService.getProducts().then((result)=>{
      this.products = result;
      this.isDataLoaded = true;
    });
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

  goToDetails(product:any) {
    this.router.navigate(['/product-detail',product.id]);
  }

  Create() {
    this.displayCreateDialog=true;
  }

  ConfirmCreate() {
    this.productService.createProduct(this.newProductName,this.newProductCategories).then(()=>{
      this.GetProducts();
      this.displayCreateDialog=false;
      this.newProductName = "";
      this.newProductCategories = [];
    });
  }

  Cancel() {
    this.displayCreateDialog=false;
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

}
