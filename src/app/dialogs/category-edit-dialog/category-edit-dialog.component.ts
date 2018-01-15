import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {CategoryService} from "../../Services/category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {categoryNameValidator} from "../../Validators/category-validators";

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css']
})
export class CategoryEditDialogComponent{

  private oldName: string;
  private name:FormControl;
  categoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService) {
    this.categoryService.getCategories();
    this.createFormControls();
    this.createForm();
    this.oldName = data.Name;
    this.name.setValue(data.Name);
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      categoryNameValidator(this.categoryService,this.oldName)
    ]);
  }

  createForm(){
    this.categoryForm = new FormGroup({
      name: new FormGroup({
        categoryName: this.name
      })
    });
  }

  ConfirmEdit(){
    this.categoryService.updateCategory(this.data.Id,this.name.value);
    this.dialogRef.close(this.name.value);
  }

  Close(){
    this.dialogRef.close();
  }

  getErrorName() {
    return this.name.hasError('required') ? 'categories-name-length' :
      this.name.hasError('minlength') ? 'categories-name-length' :
        this.name.hasError('forbiddenName') ? 'categories-name-error' : '';
    //|translate
  }

}
