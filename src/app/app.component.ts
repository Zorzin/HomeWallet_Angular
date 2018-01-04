import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserIdService} from "./Services/user-id.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'app';

  private login:boolean;

  constructor(private router:Router,
              private userService: UserIdService){
    userService.loginAnnounced$.subscribe(
      id => {if(id==-1)
      {
        this.login = false;
      }
      else
      {
        this.login = true;
      }
      });
  }

  ngOnInit(): void {

    if(this.userService.getUserId().length == 0 || this.userService.getUserId() == '-1')
    {
      this.login = false;
    }
    else
    {
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
