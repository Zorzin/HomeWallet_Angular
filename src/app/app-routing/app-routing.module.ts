import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceiptComponent} from "../receipt/receipt.component";
import {ReceiptDetailsComponent} from "../receipt-details/receipt-details.component";
import {ReceiptCreateComponent} from "../receipt-create/receipt-create.component";
import {ReceiptCyclicalComponent} from "../receipt-cyclical/receipt-cyclical.component";
import {PlanCreateComponent} from "../plan-create/plan-create.component";


const routes: Routes = [
  { path: '', redirectTo: 'receipt', pathMatch: 'full' },
  { path: 'receipt',  component: ReceiptComponent },
  { path:"receipt-detail/:id", component: ReceiptDetailsComponent },
  { path:"receipt-create", component: ReceiptCreateComponent },
  { path:"plan-create", component: PlanCreateComponent },
  { path:"receipt-cyclical", component: ReceiptCyclicalComponent }
  ]

@NgModule({
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild([
    {path:'',component: ReceiptCreateComponent}
  ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
