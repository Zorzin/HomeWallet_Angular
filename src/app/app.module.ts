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
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "./Services/category.service";
import {CalendarModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import { ReceiptCyclicalComponent } from './receipt-cyclical/receipt-cyclical.component';
import {PlanCreateComponent, PlanErrorDialog} from './plan-create/plan-create.component';
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
import {LoginComponent, LoginErrorDialog} from './login/login.component';
import {LoginService} from "./Services/login.service";
import {RegisterService} from "./Services/register.service";
import {UserInfoService} from "./Services/user-id.service";
import {CheckboxModule} from 'primeng/primeng';
import { WelcomeComponent } from './welcome/welcome.component';
import {AccountComponent, PasswordChangeDialog} from './account/account.component';
import { DailySummaryComponent } from './daily-summary/daily-summary.component';
import {SummaryService} from "./Services/summary.service";
import {DropdownModule} from 'primeng/primeng';
import {PasswordService} from "./Services/password.service";
import {CurrenciesService} from "./Services/currencies.service";
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {AccountService} from "./Services/account.service";
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ShopCreateDialogComponent } from './dialogs/shop-create-dialog/shop-create-dialog.component';
import { ProductAddDialogComponent } from './dialogs/product-add-dialog/product-add-dialog.component';
import { ProductCreateDialogComponent } from './dialogs/product-create-dialog/product-create-dialog.component';
import { CategoryCreateDialogComponent } from './dialogs/category-create-dialog/category-create-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { ProductEditDialogComponent } from './dialogs/product-edit-dialog/product-edit-dialog.component';
import { ShopEditDialogComponent } from './dialogs/shop-edit-dialog/shop-edit-dialog.component';
import { CategoryEditDialogComponent } from './dialogs/category-edit-dialog/category-edit-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material";
import { WarningDialogComponent } from './dialogs/warning-dialog/warning-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  entryComponents:[
    WarningDialogComponent,
    LoginErrorDialog,
    PasswordChangeDialog,
    ShopCreateDialogComponent,
    ProductAddDialogComponent,
    ProductCreateDialogComponent,
    CategoryCreateDialogComponent,
    DeleteDialogComponent,
    ProductEditDialogComponent,
    ShopEditDialogComponent,
    CategoryEditDialogComponent,
    PlanErrorDialog
  ],
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
    PasswordChangeDialog,
    LoginErrorDialog,
    PlanErrorDialog,
    ShopCreateDialogComponent,
    ProductAddDialogComponent,
    ProductCreateDialogComponent,
    CategoryCreateDialogComponent,
    DeleteDialogComponent,
    ProductEditDialogComponent,
    ShopEditDialogComponent,
    CategoryEditDialogComponent,
    WarningDialogComponent
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
    DropdownModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers:
    [
      ReceiptService,
      ShopService,
      ReceiptProductService,
      ProductService,
      CategoryService,
      LoginService,
      RegisterService,
      UserInfoService,
      PlanService,
      SummaryService,
      PasswordService,
      CurrenciesService,
      AccountService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
