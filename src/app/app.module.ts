import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HttpModule} from "@angular/http";
import {ReceiptService} from "./Services/receipt.service";
import {ShopService} from "./Services/shop.service";
import {ReceiptproductService} from "./Services/receiptproduct.service";
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import {ProductService} from "./Services/product.service";

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent,
    ReceiptDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
  ],
  providers: [ReceiptService, ShopService, ReceiptproductService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
