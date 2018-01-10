import { Component, OnInit } from '@angular/core';
import {RegisterService} from "../Services/register.service";
import {UserInfoService} from "../Services/user-id.service";
import {UserRegister} from "../Models/user-register";
import {Router} from "@angular/router";
import {SelectItem} from "primeng/primeng";
import {CurrenciesService} from "../Services/currencies.service";
import {AccountService} from "../Services/account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private themes: SelectItem[];
  private languages: SelectItem[];
  private currencies: SelectItem[];
  private user : UserRegister;

  constructor(private registerService: RegisterService,
              private accountService: AccountService,
              private userIdService: UserInfoService,
              private router: Router,
              private currenciesService: CurrenciesService) { }

  ngOnInit() {
    this.getCurrencies();
    this.getThemes();
    this.getLanguages();
    this.user = new UserRegister();
  }

  onRegister()
  {
    this.registerService.register(this.user).then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
      this.userIdService.changeUserLanguage(this.user.language);
      this.router.navigate(['/receipts']);
    })
  }

  onLogin()
  {
    this.router.navigate(['/login']);
  }


  private getCurrencies() {
    this.currencies = this.currenciesService.getCurrencies();
  }

  private getThemes() {
    this.themes = this.accountService.getThemes();
  }

  private getLanguages() {
    this.languages = this.accountService.getLanguages();
  }

}
