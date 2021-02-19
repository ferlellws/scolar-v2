import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'tecno-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInGroup: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  errorFlag: boolean = false;
  flagRememberUser: boolean = false;
  flagShowPass: boolean = false;
  disabledButton: boolean = false;

  user: User = new User();
  emailToRemember: string = "";

  constructor(
    private _tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // this.logInGroup = this.fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    //   'emailControl': "",
    //   'passControl': "",
    // });

    // Se borra userToken del local storage
    localStorage.removeItem("userToken");
    // Se verifica si existe sesion abierta
    this.authService.getToken();

    if (localStorage.getItem("emailUser")) {
      this.emailToRemember = localStorage.getItem("emailUser") || '';
      this.flagRememberUser = true;
    }

    this.logInGroup = this.fb.group({
      // hideRequired: this.hideRequiredControl,
      // floatLabel: this.floatLabelControl,
      email: this.emailToRemember,
      password: "",
      checkRemember: this.flagRememberUser
    });

  }

  ngOnInit(): void {




    // this.logInGroup = new FormGroup({
    //   email: new FormControl(this.emailToRemember),
    //   password: new FormControl(null)
    // });

    // this.logInGroup = this.fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    //   'emailControl': [],
    //   'passControl': [],
    // });

  }

  changeChecked(flagRememberUser: any) {
    console.log(flagRememberUser);

  }

  async logIn() {
    // var credenciales = {
    //   auth: {
    //     email: this.logInGroup.get('emailControl').value,
    //     password: this.logInGroup.get('passControl').value
    //   }
    // }
    // const t = await this._tokenService.getToken(credenciales)
    // if(t == false) {
    //   this.errorFlag =true
    // }else {
    //   sessionStorage.menuLoaded = false;
    //   this.router.navigate(['/home'])
    // }

  }

  onLogin() {
    this.disabledButton = true;
    this.user = this.logInGroup.value;
    this.flagRememberUser = this.logInGroup.value.checkRemember;
    console.log(this.user);
    this.authService.onLogin(this.user)
      .subscribe((res: any) => {
        console.log({res});
        this.openSnackBar(true, res.messages, "");
        console.log(this.flagRememberUser);

        if (this.flagRememberUser) {
          localStorage.setItem("emailUser", this.user.email);
        }
        this.disabledButton = false;
        this.logInGroup.reset();
      }, (err) => {
        this.disabledButton = false;
        this.openSnackBar(false, err.error.messages, "");
        console.error(err);
      });
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
