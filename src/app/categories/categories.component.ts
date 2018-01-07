import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  products: any;
  newCategoryName: string;

  private categories: any;
  private displayCreateDialog: boolean;

  constructor(private router: Router,
              private categoryService: CategoryService,
              private userService: UserInfoService) { }

  ngOnInit() {
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
    });

  }

  goToDetails(category:any) {
    this.router.navigate(['/category-detail',category.id]);
  }

  Create() {
    this.displayCreateDialog=true;
  }

  ConfirmCreate() {
    this.categoryService.createCategory(this.newCategoryName).add(()=>{
      this.getCategories();
      this.displayCreateDialog=false;
      this.newCategoryName = "";
    });
  }

  Cancel() {
    this.displayCreateDialog=false;
  }

}
