import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router : Router,
              private userService: UserInfoService) { }

  ngOnInit() {
    this.checkUser();
  }

  checkUser()
  {
    if(this.userService.isUserLogIn())
    {
      this.router.navigate(['/receipts']);
    }
  }
  onRegister()
  {
    this.router.navigate(['/register']);
  }

  onLogin()
  {
    this.router.navigate(['/login']);
  }
}
