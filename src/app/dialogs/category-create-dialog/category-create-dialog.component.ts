import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CategoryService} from "../../Services/category.service";

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['./category-create-dialog.component.css']
})
export class CategoryCreateDialogComponent{

  private name:string;

  constructor(public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService) {
  }

  ConfirmCreate(){
    this.categoryService.createCategory(this.name);
    this.Close();
  }

  Close(){
    this.dialogRef.close();
  }
}
