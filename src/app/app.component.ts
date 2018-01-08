import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "./Services/user-id.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  private login:boolean;

  constructor(private router:Router,
              private userService: UserInfoService){
    userService.loginAnnounced$.subscribe(
      id => {
        this.checkUser();
      });
  }

  ngOnInit(): void {
    this.checkUser();

  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.login = false;
    }
    else{
      this.login = true;
    }
  }

  goToHome() {
    this.router.navigate(['/receipts']);
  }

  goToOptions() {
    this.router.navigate(['/options']);
  }

  onRegister()
  {
    this.router.navigate(['/register']);
  }

  onLogin()
  {
    this.router.navigate(['/login']);
  }

  onAccount() {
    this.router.navigate(['/account']);
  }

  onLogOut()
  {
    this.userService.setUserId(-1);
    this.router.navigate(['/login']);
  }
}
