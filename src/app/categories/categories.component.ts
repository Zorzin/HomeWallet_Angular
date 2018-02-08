import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";
import {CategoryCreateDialogComponent} from "../dialogs/category-create-dialog/category-create-dialog.component";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Category} from "../Models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isDataLoaded: boolean;
  public width:number;
  public height:number;
  public categories: Category[];
  public dataSource: MatTableDataSource<Category>;
  public displayedColumns = ['name'];

  constructor(private router: Router,
              private categoryService: CategoryService,
              private userService: UserInfoService,
              private dialog: MatDialog) {
    this.categories = [];
    this.dataSource = new MatTableDataSource<Category>(this.categories);
    this.isDataLoaded = true;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
    this.categoryService.getCategories()
      .then((response)=>{
        this.getCategoriesArray(response);
        this.dataSource.data = [];
        this.dataSource.data = this.categories;
      })
      .catch(reason => this.isDataLoaded=false);

  }

  getCategoriesArray(response:any){
    for(let category of response)
    {
      let newCategory = new Category();
      newCategory.ID = category.id;
      newCategory.Name = category.name;
      this.categories.push(newCategory);
    }
  }

  goToDetails(id:number) {
    this.router.navigate(['/category-detail',id]);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
