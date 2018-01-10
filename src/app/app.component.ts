import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "./Services/user-id.service";
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private login:boolean;
  private lang:string = 'en';

  constructor(private router:Router,
              private userService: UserInfoService,
              private translate: TranslateService){


    userService.loginAnnounced$.subscribe(
      id => {
        this.checkUser();
        this.getLanguage();
      });

    userService.languageAnnounced$.subscribe(
      lang => {
        this.getLanguage();
      });
  }

  setTranslate(){
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use(this.lang);
  }

  ngOnInit(): void {
    this.checkUser();
    this.getLanguage();
  }

  getLanguage(){

    if(this.userService.isUserLogIn()) {
      this.userService.getUserLanguage().then((response) => {
        this.lang = JSON.parse(response);
        this.setTranslate();
      });
    }
    else {

      let lang = localStorage.getItem('lang');
      if(!lang)
      {
        this.lang = 'en';
      }
      else {
        this.lang = lang;
      }
      this.setTranslate();
    }
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
