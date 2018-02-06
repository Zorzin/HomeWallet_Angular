import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CategoryService} from "../../Services/category.service";
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators, FormGroup} from "@angular/forms";
import {categoryNameValidator} from "../../Validators/category-validators";

@Component({
  selector: 'app-category-create-dialog',
  templateUrl: './category-create-dialog.component.html',
  styleUrls: ['./category-create-dialog.component.css']
})

export class CategoryCreateDialogComponent{

  public name:FormControl;
  public categoryForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryService) {
    this.categoryService.getCategories();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      categoryNameValidator(this.categoryService,'')
    ]);
  }

  createForm(){
    this.categoryForm = new FormGroup({
      name: new FormGroup({
        categoryName: this.name
      })
    });
  }

  ConfirmCreate(){
    this.categoryService.createCategory(this.name.value);
    this.Close();
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
