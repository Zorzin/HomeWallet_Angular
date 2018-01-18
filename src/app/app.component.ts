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

  private login:boolean;
  private lang:string = 'en';

  constructor(private router:Router,
              private userService: UserInfoService,
              private translate: TranslateService,
              private renderer: Renderer2,
              private el: ElementRef){


    userService.loginAnnounced$.subscribe(
      id => {
        this.checkUser();
        this.getLanguage();
      });

    userService.languageAnnounced$.subscribe(
      lang => {
        this.getLanguage();
      });

    userService.themeAnnounced$.subscribe(
      theme=>this.changeTheme(theme)
    )
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

  private changeTheme(theme: string) {
    if(theme=='light')
    {
      this.renderer.setStyle(document.querySelector("body"), 'color', "#000");
      this.renderer.setStyle(document.querySelector("body") , 'background-color', "#fbfbfb");
    }
    else if(theme=='dark')
    {
      document.querySelector("body").style.cssText = "--main-bg: rgba(0, 0, 0, .7)";
    }
  }
}
//.receiptcreate rgba(154, 154, 154, 0.5) border: 1px solid black
