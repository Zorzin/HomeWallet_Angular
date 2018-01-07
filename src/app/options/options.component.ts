import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private router:Router,
              private userService: UserInfoService) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
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

}
