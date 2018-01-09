import {Component, Inject, OnInit} from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";
import {PasswordService} from "../Services/password.service";
import {PasswordChange} from "../Models/password-change";
import {SelectItem} from "primeng/primeng";
import {CurrenciesService} from "../Services/currencies.service";
import {AccountService} from "../Services/account.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private currencies: SelectItem[];
  private themes: SelectItem[];
  private languages: SelectItem[];
  private language:string;
  private theme:string;
  private currency:string;
  private passwordChange: PasswordChange;
  private width:number;
  private height:number;
  private passwordDialogDisplay:boolean;
  private currencyDialogDisplay: boolean;

  constructor(private userService:UserInfoService,
              private accountService: AccountService,
              private passwordService: PasswordService,
              private router:Router,
              private currenciesService:CurrenciesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrencies();
    this.getLanguages();
    this.getThemes();
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

  private ConfirmChangePassword() {
      if(this.passwordChange.newPassword == this.passwordChange.reNewPassword)
      {
        this.passwordService.changePassword(this.passwordChange).then(()=>{
          this.passwordChange = new PasswordChange();
          this.openPasswordSuccessDialog();
        })
      }
  }

  openPasswordSuccessDialog(){
    let dialogRef = this.dialog.open(PasswordSuccessDialog,{
      height: '100px',
      width: '300px',
    });
  }

  private changeCurrency() {
    this.userService.changeUserCurrency(this.currency);
  }

  private changeLanguage() {
    this.userService.changeUserLanguage(this.language);
  }

  private changeTheme() {
    this.userService.changeUserTheme(this.theme);
  }


  private getCurrencies() {
    this.currencies = this.currenciesService.getCurrencies();
    this.userService.getUserCurrency().then((response)=>this.currency = JSON.parse(response));
  }

  private getLanguages() {
    this.languages = this.accountService.getLanguages();
    this.userService.getUserLanguage().then((response)=>this.language = JSON.parse(response));
  }

  private getThemes() {
    this.themes = this.accountService.getThemes();
    this.userService.getUserTheme().then((response)=>this.theme = JSON.parse(response));
  }

  private saveAccount()
  {
    this.changeCurrency();
    this.changeTheme();
    this.changeLanguage();
  }
}

@Component({
  selector: 'password-success-dialog',
  templateUrl: 'passwordSuccessDialog.html',
})
export class PasswordSuccessDialog {
  constructor(public dialogRef: MatDialogRef<PasswordSuccessDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
