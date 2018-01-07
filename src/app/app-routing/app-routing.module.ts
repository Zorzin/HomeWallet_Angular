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
import {OptionsComponent} from "../options/options.component";
import {PlanEditComponent} from '../plan-edit/plan-edit.component';
import {PlansComponent} from "../plans/plans.component";
import {RegisterComponent} from "../register/register.component";
import {LoginComponent} from "../login/login.component";
import {WelcomeComponent} from "../welcome/welcome.component";
import {AccountComponent} from "../account/account.component";
import {DailySummaryComponent} from "../daily-summary/daily-summary.component";


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: WelcomeComponent},
  { path: 'receipts',  component: ReceiptComponent },
  { path: 'options',  component: OptionsComponent},
  { path:"receipt-create", component: ReceiptCreateComponent },
  { path:"plan-create", component: PlanCreateComponent },
  { path:"receipt-cyclical", component: ReceiptCyclicalComponent },
  { path:"shops", component: ShopsComponent },
  { path:"plans", component: PlansComponent },
  { path:"products", component: ProductsComponent },
  { path:"categories", component: CategoriesComponent },
  { path:"shop-detail/:id", component: ShopDetailsComponent },
  { path:"shop-edit/:id", component: ShopEditComponent },
  { path:"product-detail/:id", component: ProductDetailsComponent },
  { path:"category-detail/:id", component: CategoryDetailsComponent },
  { path:"receipt-detail/:id", component: ReceiptDetailsComponent },
  { path:"receipt-edit/:id", component: ReceiptEditComponent },
  { path:"plan-edit/:id", component: PlanEditComponent },
  { path:"plan-details/:id", component: PlanDetailsComponent},
  { path:"register", component: RegisterComponent},
  { path:"login", component: LoginComponent},
  { path:"account", component: AccountComponent},
  { path: 'daily-summary/:date', component: DailySummaryComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild([
    {path:'',component: ReceiptCreateComponent}
  ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
