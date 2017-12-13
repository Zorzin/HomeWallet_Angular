import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../Services/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private details: boolean;
  private isDataLoaded: boolean;
  private hasCategories: boolean;
  private removeDialogDisplay: boolean;
  private editDialogDisplay: boolean;

  product:any;
  categories : any;

  constructor(
    private router : Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
      .subscribe((product) => {
          this.details = true;
          this.product = product;
          this.isDataLoaded = true;
          this.GetCategories();
      });
  }

  SetStatistics() {
    this.details = false;
  }

  SetDetails() {
    this.details = true;
  }

  private GetCategories() {
    this.productService.getCategories(this.product.id).then((response)=>{
      if(response!=null)
      {
        this.hasCategories = true;
        this.categories = response;
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
  }

  CancelEdit() {
    this.editDialogDisplay = false;
  }
}
