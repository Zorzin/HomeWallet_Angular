import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../Services/product.service";
import {SelectItem} from "primeng/primeng";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private width:number;
  private height:number;
  private details: boolean;
  private isDataLoaded: boolean;
  private hasCategories: boolean;
  private removeDialogDisplay: boolean;
  private editDialogDisplay: boolean;

  product:any;
  categories : any;

  multiSelectCategories: SelectItem[];
  currentCategories: any;

  constructor(
    private router : Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserInfoService) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.currentCategories = [];
    this.multiSelectCategories = [];
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
      .subscribe((product) => {
        this.details = true;
        this.product = product;
        this.GetCategories();
        this.getAllCategories();
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

  SetStatistics() {
    this.details = false;
  }

  SetDetails() {
    this.details = true;
  }

  private GetCategories() {
    this.productService.getCategories(this.product.id).then((response)=>{
      if(response.toString())
      {
        this.hasCategories = true;
        this.categories = response;
        for(let category of this.categories) {
          this.currentCategories.push(category.id);
        }
      }
    });
  }

  getAllCategories()
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

  CategoryDetails(category:any)
  {
    this.router.navigate(['/category-detail',category.id]);
  }

  GoBack()
  {
    this.router.navigate(['/products']);
  }

  Edit() {
    this.editDialogDisplay = true;
  }

  Delete()
  {
    this.removeDialogDisplay = true;
  }

  CancelDelete()
  {
    this.removeDialogDisplay = false;
  }

  ConfirmDelete()
  {
    this.productService.deleteProduct(this.product.id).then(()=>{
      this.GoBack();
    });
  }

  ConfirmEdit() {
    this.productService.updateProduct(this.product.id,this.product.name,this.currentCategories).then(()=>{
      this.GetCategories();
      this.editDialogDisplay=false;
    });
  }

  CancelEdit() {
    this.editDialogDisplay = false;
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
