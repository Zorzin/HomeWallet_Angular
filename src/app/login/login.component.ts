import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from "../Services/login.service";
import {UserLogin} from "../Models/user-login";
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {categoryNameValidator} from "../Validators/category-validators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {PasswordSuccessDialog} from "../account/account.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user : UserLogin;
  private loginName:FormControl;
  private passwordName:FormControl;
  private loginForm: FormGroup;

  constructor(private loginService:LoginService,
              private userIdService: UserInfoService,
              private router: Router,
              public dialog: MatDialog) {
  }


  createFormControls() {
    this.loginName = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]);

    this.passwordName = new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]);
  }

  createForm(){
    this.loginForm = new FormGroup({
      login: new FormGroup({
        loginName: this.loginName
      }),
      password: new FormGroup({
        passwordName: this.passwordName
      })
    });
  }

  ngOnInit(){
    this.user = new UserLogin();
    this.createFormControls();
    this.createForm();
  }

  onLogin(){
    this.user.login = this.loginName.value;
    this.user.password= this.passwordName.value;
    this.loginService.login(this.user)
      .then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
      this.userIdService.getUserLanguage().then(response=>this.userIdService.changeUserLanguage(JSON.parse(response)));
      this.router.navigate(['/receipts']);
      })
      .catch(reason => this.openDialog())
  }

  openDialog(){
    let dialogRef = this.dialog.open(LoginErrorDialog,{
      height: '100px',
      width: '300px',
    });
  }

  onRegister()
  {
    this.router.navigate(['/register']);
  }

}


@Component({
  selector: 'login-error-dialog',
  templateUrl: 'loginErrorDialog.html',
})
export class LoginErrorDialog {
  constructor(public dialogRef: MatDialogRef<LoginErrorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
