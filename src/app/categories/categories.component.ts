import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";
import {CategoryCreateDialogComponent} from "../dialogs/category-create-dialog/category-create-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private isDataLoaded: boolean;
  private width:number;
  private height:number;
  private products: any;
  private categories: any;

  constructor(private router: Router,
              private categoryService: CategoryService,
              private userService: UserInfoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.getCategories();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  getCategories()
  {
    this.categoryService.getCategories().then((response)=>{
      this.categories= response;
      this.isDataLoaded = true;
    });

  }

  goToDetails(category:any) {
    this.router.navigate(['/category-detail',category.id]);
  }

  Create() {
    let dialogRef = this.dialog.open(CategoryCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

}
