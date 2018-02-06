import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserInfoService} from "./Services/user-id.service";
import {TranslateService} from '@ngx-translate/core';
import {Renderer2} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public login:boolean;
  public lang:string = 'en';

  constructor(private router:Router,
              private userService: UserInfoService,
              private translate: TranslateService,
              private renderer: Renderer2,
              private el: ElementRef){


    userService.loginAnnounced$.subscribe(
      id => {
        this.checkUser();
        this.getLanguage();
        this.userService.getUserTheme().then(response=>this.changeTheme(JSON.parse(response)));
      });

    userService.languageAnnounced$.subscribe(
      lang => {
        this.getLanguage();
      });

    userService.themeAnnounced$.subscribe(
      theme=>this.changeTheme(theme)
    );
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
    this.userService.getUserTheme().then(response=>this.changeTheme(JSON.parse(response)));
  }

  getLanguage(){

    if(this.userService.isUserLogIn()) {
      this.userService.getUserLanguage()
        .then((response) => {
          try {
            this.lang = JSON.parse(response);
            this.setTranslate();
          }
          catch(e) {
            this.lang='en';
            this.setTranslate();
          }
        })
        .catch((reason) => {
          this.lang='en';
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
      document.querySelector("body").style.cssText = "--main-bg: rgba(0, 0, 0, .7)";
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

  private changeTheme(theme: string) {
    if(theme=='light')
    {
      var bodyStyles = document.body.style;
      bodyStyles.setProperty('--text-color', 'black');
      bodyStyles.setProperty('--main-bg', 'white');
      bodyStyles.setProperty('--receipt-bg', 'rgba(154, 154, 154, 0.2)');
      bodyStyles.setProperty('--receipt-border', 'black');
      bodyStyles.setProperty('--inputs-text-color', 'black');
      bodyStyles.setProperty('--tab-color', 'black');
      bodyStyles.setProperty('--inputs-text-color', 'black');
      bodyStyles.setProperty('--modal-color', 'white');
      bodyStyles.setProperty('--modal-text', 'black');
      bodyStyles.setProperty('--panel-color', 'white')
      bodyStyles.setProperty('--navbar-color', '#3f51b5');
      //
    }
    else if(theme=='dark')
    {
      document.querySelector("body").style.cssText = "--main-bg: rgba(0, 0, 0, .7)";
    }
  }
}
