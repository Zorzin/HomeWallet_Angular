import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../Services/register.service";
import {UserInfoService} from "../Services/user-id.service";
import {UserRegister} from "../Models/user-register";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user : UserRegister;

  constructor(private registerService: RegisterService,
              private userIdService: UserInfoService,
              private router: Router) { }

  ngOnInit() {
    this.user = new UserRegister();
  }

  onRegister()
  {
    this.registerService.register(this.user).then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
      this.router.navigate(['/receipts']);
    })
  }

  onLogin()
  {
    this.router.navigate(['/login']);
  }

}
