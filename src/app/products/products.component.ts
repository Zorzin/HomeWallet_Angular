import { Component, OnInit } from '@angular/core';
import {ProductService} from "../Services/product.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";
import {ProductCreateDialogComponent} from "../dialogs/product-create-dialog/product-create-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private isDataLoaded:boolean;
  private width:number;
  private height:number;
  private products: any;

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserInfoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
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

  goToDetails(product:any) {
    this.router.navigate(['/product-detail',product.id]);
  }

  Create() {
    let dialogRef = this.dialog.open(ProductCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.GetProducts();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

}
