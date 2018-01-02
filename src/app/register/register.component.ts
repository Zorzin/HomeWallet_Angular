import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../Services/register.service";
import {UserIdService} from "../Services/user-id.service";
import {UserRegister} from "../Models/user-register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user : UserRegister;

  constructor(private registerService: RegisterService,
              private userIdService: UserIdService) { }

  ngOnInit() {
    this.user = new UserRegister();
  }

  onRegister()
  {
    this.registerService.register(this.user).then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
    })
  }

}
