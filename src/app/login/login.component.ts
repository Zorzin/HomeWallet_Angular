import { Component, OnInit } from '@angular/core';
import {LoginService} from "../Services/login.service";
import {UserLogin} from "../Models/user-login";
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user : UserLogin;

  constructor(private loginService:LoginService,
              private userIdService: UserInfoService,
              private router: Router) { }

  ngOnInit(){
    this.user = new UserLogin();
  }

  onLogin(){
    this.loginService.login(this.user).then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
      this.userIdService.getUserLanguage().then(response=>this.userIdService.changeUserLanguage(JSON.parse(response)));

      this.router.navigate(['/receipts']);
    })
  }

  onRegister()
  {
    this.router.navigate(['/register']);
  }

}
