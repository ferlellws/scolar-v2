import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './models/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showFiller = true;
  title = 'tecno-project-front';
  autorizado = false;
  lastname = '';
  firstname = '';
  menu: Menu [] = [];
  user: any = {};

  constructor(
    private router: Router,
    // private _usersService: UserService
  ) {
  }

  getRoute() {
    if(sessionStorage != null){
      this.firstname = `${sessionStorage.firstname}`.split(" ")[0];
      this.lastname = `${sessionStorage.lastname}`.split(" ")[0];
      this.user =
      {
        id: sessionStorage.id,
        firstname: this.firstname,
        lastname:this.lastname
      }
    }
    return this.router.url;
  }

  logOut() {
    //falta salir de sesion en back
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
