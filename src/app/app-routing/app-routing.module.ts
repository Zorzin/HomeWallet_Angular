import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceiptComponent} from "../receipt/receipt.component";
import {ReceiptDetailsComponent} from "../receipt-details/receipt-details.component";


const routes: Routes = [
  { path: '', redirectTo: 'receipt', pathMatch: 'full' },
  { path: 'receipt',  component: ReceiptComponent },
  { path:"receipt-detail/:id", component: ReceiptDetailsComponent }
  ]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
