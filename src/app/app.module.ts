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
import {InputSwitchModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import { ReceiptCyclicalComponent } from './receipt-cyclical/receipt-cyclical.component';
import { PlanCreateComponent } from './plan-create/plan-create.component';
import {PlanService} from "./Services/plan.service";
import { PlanDetailsComponent } from './plan-details/plan-details.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReceiptEditComponent } from './receipt-edit/receipt-edit.component';
import { OptionsComponent } from './options/options.component';
import { PlanEditComponent } from './plan-edit/plan-edit.component';
import { PlansComponent } from './plans/plans.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {LoginService} from "./Services/login.service";
import {RegisterService} from "./Services/register.service";
import {UserInfoService} from "./Services/user-id.service";
import {CheckboxModule} from 'primeng/primeng';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountComponent } from './account/account.component';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';
import {SummaryService} from "./Services/summary.service";
import {DropdownModule} from 'primeng/primeng';
import {PasswordService} from "./Services/password.service";

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
    CategoryDetailsComponent,
    ProductsComponent,
    CategoriesComponent,
    ReceiptEditComponent,
    OptionsComponent,
    PlanEditComponent,
    PlansComponent,
    RegisterComponent,
    LoginComponent,
    WelcomeComponent,
    AccountComponent,
    DailySummaryComponent,
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
    CheckboxModule,
    InputSwitchModule,
    DropdownModule
  ],
  providers: [ReceiptService, ShopService, ReceiptProductService, ProductService, CategoryService, LoginService, RegisterService, UserInfoService,PlanService, SummaryService, PasswordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
