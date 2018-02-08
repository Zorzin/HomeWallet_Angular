import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../Services/product.service";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";
import {ProductCreateDialogComponent} from "../dialogs/product-create-dialog/product-create-dialog.component";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Category} from "../Models/category";
import {Product} from "../Models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isDataLoaded:boolean;
  public width:number;
  public height:number;
  public products: Product[];
  public dataSource: MatTableDataSource<Product>;
  public displayedColumns = ['name'];

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserInfoService,
              private dialog: MatDialog) {
    this.products = [];
    this.dataSource = new MatTableDataSource<Product>(this.products);
    this.isDataLoaded = true;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
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
      this.getProductsArray(result);
      this.dataSource.data = [];
      this.dataSource.data = this.products;
    })
    .catch(reason => this.isDataLoaded=false);;
  }

  goToDetails(id:number) {
    this.router.navigate(['/product-detail',id]);
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private getProductsArray(response: any) {
    for(let product of response)
    {
      let newProduct = new Product();
      newProduct.ID = product.id;
      newProduct.Name = product.name;
      this.products.push(newProduct);
    }
  }
}
