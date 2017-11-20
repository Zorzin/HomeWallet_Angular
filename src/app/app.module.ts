import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {ReceiptService} from "./Services/receipt.service";
import {ShopService} from "./Services/shop.service";
import {ReceiptproductService} from "./Services/receiptproduct.service";
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
import {MultiSelectModule} from 'primeng/primeng';
import { ReceiptCyclicalComponent } from './receipt-cyclical/receipt-cyclical.component';

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptDetailsComponent,
    ReceiptCreateComponent,
    ReceiptCyclicalComponent,
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
    MultiSelectModule
  ],
  providers: [ReceiptService, ShopService, ReceiptproductService, ProductService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
