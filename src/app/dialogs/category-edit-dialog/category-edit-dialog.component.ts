import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {CategoryService} from "../../Services/category.service";

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css']
})
export class CategoryEditDialogComponent{

  private name:string;

  constructor(public dialogRef: MatDialogRef<CategoryEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService) {
    this.name = data.Name;
  }

  ConfirmEdit(){
    this.categoryService.updateCategory(this.data.Id,this.name);
    this.dialogRef.close(this.name);
  }

  Close(){
    this.dialogRef.close();
  }

}
