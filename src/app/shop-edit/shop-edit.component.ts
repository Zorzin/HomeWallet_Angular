import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shop-edit',
  templateUrl: './shop-edit.component.html',
  styleUrls: ['./shop-edit.component.css']
})
export class ShopEditComponent implements OnInit {

  constructor(private userService:UserInfoService,
              private router:Router) { }

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

}
