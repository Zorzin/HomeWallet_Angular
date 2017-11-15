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

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptDetailsComponent,
    ReceiptCreateComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    DialogModule,
    BrowserAnimationsModule
  ],
  providers: [ReceiptService, ShopService, ReceiptproductService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
