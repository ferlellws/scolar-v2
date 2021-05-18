import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  errorFlag = false;

  constructor(
    private _tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    sessionStorage.clear();
    this.logInGroup = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      'emailControl': [],
      'passControl': [],
    });
      
  }

  async logIn() {
    var credenciales = {auth: 
      {
        email: this.logInGroup.get('emailControl').value, 
        password: this.logInGroup.get('passControl').value
      }
    }
    const t = await this._tokenService.getToken(credenciales)
    if(t == false) {
      this.errorFlag =true
    }else {
      sessionStorage.menuLoaded = false;
      this.router.navigate(['/home'])
    }
    
  }

}
