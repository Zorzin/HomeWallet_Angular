import { Component, OnInit } from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";
import {PasswordService} from "../Services/password.service";
import {PasswordChange} from "../Models/password-change";
import {SelectItem} from "primeng/primeng";
import {CurrenciesService} from "../Services/currencies.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  currencies: SelectItem[];
  private currency:string;
  private passwordChange: PasswordChange;
  private width:number;
  private height:number;
  private passwordDialogDisplay:boolean;
  private currencyDialogDisplay: boolean;

  constructor(private userService:UserInfoService,
              private passwordService: PasswordService,
              private router:Router,
              private currenciesService:CurrenciesService) { }

  ngOnInit() {
    this.getCurrencies();
    this.passwordChange = new PasswordChange();
    this.checkUser();
    this.getWidthAndHeight();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private showPasswordDialog()
  {
    this.passwordDialogDisplay = true;
  }

  private hidePasswordDialog()
  {
    this.passwordDialogDisplay = false;
  }

  private ConfirmChangePassword() {
      if(this.passwordChange.newPassword == this.passwordChange.reNewPassword)
      {
        this.passwordService.changePassword(this.passwordChange).then(()=>{
          this.hidePasswordDialog();
        })
      }
  }

  private CancelChangePassword() {
    this.hidePasswordDialog();
  }

  private showCurrencyDialog() {
    this.currencyDialogDisplay = true;
  }

  private ConfirmChangeCurrency() {
    this.userService.changeUserCurrency(this.currency).then(()=>{
      this.currencyDialogDisplay = false;
    });
  }

  private CancelChangeCurrency() {
    this.currencyDialogDisplay = false;
  }


  private getCurrencies() {
    this.currencies = this.currenciesService.getCurrencies();
    this.userService.getUserCurrency().then((response)=>this.currency = JSON.parse(response));
  }
}
