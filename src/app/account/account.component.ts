import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService:UserInfoService,
              private router:Router) { }

  ngOnInit() {
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

}
