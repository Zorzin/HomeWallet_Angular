import {Component, OnInit, ViewChild} from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {Shop} from "../Models/shop";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";
import {ShopCreateDialogComponent} from "../dialogs/shop-create-dialog/shop-create-dialog.component";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Category} from "../Models/category";
import {Product} from "../Models/product";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public width: number;
  public height:number;
  public shops: Shop[];
  public isDataLoaded: boolean;
  public dataSource: MatTableDataSource<Shop>;
  public displayedColumns = ['name'];

  constructor(private shopService: ShopService,
              private router: Router,
              private userService:UserInfoService,
              private dialog: MatDialog) {
    this.shops = [];
    this.dataSource = new MatTableDataSource<Shop>(this.shops);
    this.isDataLoaded = true;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.getShops();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private getShops() {
    this.shopService.getShops().then((result)=>{
      this.getShopsArray(result);
      this.dataSource.disconnect();
      this.dataSource = new MatTableDataSource<Shop>(this.shops);
    })
    .catch(reason => this.isDataLoaded=false);;
  }

  goToDetails(id:number) {
    this.router.navigate(['/shop-detail',id]);
  }

  Create() {

    let dialogRef = this.dialog.open(ShopCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private getShopsArray(result: any) {
    for(let shop of result)
    {
      let newShop = new Shop();
      newShop.ID = shop.id;
      newShop.Name = shop.name;
      this.shops.push(newShop);
    }
  }
}
