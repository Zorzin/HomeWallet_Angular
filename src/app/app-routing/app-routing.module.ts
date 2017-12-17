import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceiptComponent} from "../receipt/receipt.component";
import {ReceiptDetailsComponent} from "../receipt-details/receipt-details.component";
import {ReceiptCreateComponent} from "../receipt-create/receipt-create.component";
import {ReceiptCyclicalComponent} from "../receipt-cyclical/receipt-cyclical.component";
import {PlanCreateComponent} from "../plan-create/plan-create.component";
import {PlanDetailsComponent} from "../plan-details/plan-details.component";
import {ShopsComponent} from "../shops/shops.component";
import {ShopDetailsComponent} from "../shop-details/shop-details.component";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {ShopEditComponent} from "../shop-edit/shop-edit.component";
import {CategoryDetailsComponent} from "../category-details/category-details.component";
import {ProductsComponent} from "../products/products.component";
import {CategoriesComponent} from "../categories/categories.component";
import {ReceiptEditComponent} from "../receipt-edit/receipt-edit.component";


const routes: Routes = [
  { path: '', redirectTo: 'receipts', pathMatch: 'full' },
  { path: 'receipts',  component: ReceiptComponent },
  { path:"receipt-detail/:id", component: ReceiptDetailsComponent },
  { path:"receipt-edit/:id", component: ReceiptEditComponent },
  { path:"receipt-create", component: ReceiptCreateComponent },
  { path:"plan-create", component: PlanCreateComponent },
  { path:"plan", component: PlanDetailsComponent},
  { path:"receipt-cyclical", component: ReceiptCyclicalComponent },
  { path:"shops", component: ShopsComponent },
  { path:"products", component: ProductsComponent },
  { path:"categories", component: CategoriesComponent },
  { path:"shop-detail/:id", component: ShopDetailsComponent },
  { path:"shop-edit/:id", component: ShopEditComponent },
  { path:"product-detail/:id", component: ProductDetailsComponent },
  { path:"category-detail/:id", component: CategoryDetailsComponent }
  ]

@NgModule({
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild([
    {path:'',component: ReceiptCreateComponent}
  ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
