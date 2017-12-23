import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goShops()
  {
    this.router.navigate(['/shops']);
  }

  goCategories()
  {
    this.router.navigate(['/categories']);
  }

  goProducts()
  {
    this.router.navigate(['/products']);
  }

  goCreateReceipt()
  {
    this.router.navigate(['/receipt-create']);
  }

  goCreateCyclicalReceipt()
  {
    this.router.navigate(['/receipt-cyclical']);
  }

  goPlan()
  {
    this.router.navigate(['/plans']);
  }

  goSettings()
  {

  }

  goAccount()
  {

  }

}
