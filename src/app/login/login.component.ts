import { Component, OnInit } from '@angular/core';
import {LoginService} from "../Services/login.service";
import {UserLogin} from "../Models/user-login";
import {UserIdService} from "../Services/user-id.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user : UserLogin;

  constructor(private loginService:LoginService,
              private userIdService: UserIdService) { }

  ngOnInit(){
    this.user = new UserLogin();
  }

  onLogin(){
    this.loginService.login(this.user).then((response)=>{
      console.log(response);
      this.userIdService.setUserId(parseInt(response,10));
    })
  }

}
