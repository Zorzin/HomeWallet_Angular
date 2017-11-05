import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HttpModule} from "@angular/http";
import {ReceiptService} from "./receipt.service";

@NgModule({
  declarations: [
    AppComponent,
    ReceiptComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
  ],
  providers: [ReceiptService],
  bootstrap: [AppComponent]
})
export class AppModule { }
