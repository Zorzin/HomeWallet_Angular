import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {ReceiptService} from "./Services/receipt.service";
import {ShopService} from "./Services/shop.service";
import {ReceiptProductService} from "./Services/receiptproduct.service";
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import {ProductService} from "./Services/product.service";
import { ReceiptCreateComponent } from './receipt-create/receipt-create.component';
import {HttpClientModule} from "@angular/common/http";
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {CategoryService} from "./Services/category.service";
import {CalendarModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import { ReceiptCyclicalComponent } from './receipt-cyclical/receipt-cyclical.component';
import { PlanCreateComponent } from './plan-create/plan-create.component';
import {PlanService} from "./Services/plan.service";
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopEditComponent } from './shop-edit/shop-edit.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReceiptEditComponent } from './receipt-edit/receipt-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptDetailsComponent,
    ReceiptCreateComponent,
    ReceiptCyclicalComponent,
    PlanCreateComponent,
    PlanDetailsComponent,
    ShopsComponent,
    ShopDetailsComponent,
    ProductDetailsComponent,
    ShopEditComponent,
    CategoryDetailsComponent,
    ProductsComponent,
    CategoriesComponent,
    ReceiptEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule
  ],
  providers: [ReceiptService, ShopService, ReceiptProductService, ProductService, CategoryService, PlanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
