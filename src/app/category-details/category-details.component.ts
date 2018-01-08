import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../Services/product.service";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  private width:number;
  private height:number;
  private details: boolean;
  private isDataLoaded: boolean;
  private hasProducts: boolean;
  private removeDialogDisplay: boolean;
  private editDialogDisplay: boolean;

  category:any;
  products : any;

  constructor(
    private router : Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserInfoService) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.categoryService.getCategory(+params.get('id')))
      .subscribe((result) => {
        this.details = true;
        this.category = result;
        this.GetProducts();
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

  private GetProducts() {
    this.categoryService.getProducts(this.category.id).then((response)=>{
      if(response.toString())
      {
        this.hasProducts = true;
        this.products = response;
      }
    });
  }

  ProductDetails(product:any)
  {
    this.router.navigate(['/product-detail',product.id]);
  }

  GoBack()
  {
    this.router.navigate(['/categories']);
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
    this.categoryService.deleteCategory(this.category.id).add(()=>{
      this.GoBack();
    });
  }

  ConfirmEdit() {
    this.categoryService.updateCategory(this.category.id,this.category.name).add(()=>{
      this.GetProducts();
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
