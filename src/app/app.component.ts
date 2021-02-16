import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from './models/menu';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showFiller = true;
  title = 'tecno-project-front';
  autorizado = false;
  lastname = 'Usuario';
  firstname = 'Tecno';
  menu: Menu [] = [];
  user: any = {
    id: 1,
    firstname: 'Ferley',
    lastname: 'León'
  };

  showToolbarSidenav: boolean = false;
  entrySub: any;

  constructor(
    private router: Router,
    private authService: AuthService
    // private _usersService: UserService
  ) { }

  ngOnInit() {
    // Se verifica si existe token del usuario al momento de ingresar o de refrescar
    if (this.authService.getToken()) {
      this.showToolbarSidenav = true;
    }

    // Se verifica si se emite un cambio desde el servicio a la variable showToolbarSidenav
    this.entrySub = this.authService.showToolbarSidenav
      .subscribe(flagShowToolbarSidenav => {
        this.showToolbarSidenav = flagShowToolbarSidenav
        // console.log({flagShowToolbarSidenav});
      });

  }

  getRoute() {
    if (sessionStorage != null) {
      this.firstname = `${sessionStorage.firstname}`.split(" ")[0] || 'Usuario';
      this.lastname = `${sessionStorage.lastname}`.split(" ")[0] || 'Tecno';
      this.user = {
        id: sessionStorage.id,
        firstname: this.firstname,
        lastname:this.lastname
      }
    } else {
      this.firstname = 'Usuario';
      this.lastname = 'Tecno';
      this.user = {
        id: 1,
        firstname: 'Ferley',
        lastname: 'León'
      }
    }
    return this.router.url;
  }

  logOut() {
    //falta salir de sesion en back
    sessionStorage.clear();
    this.authService.onLogout();
    this.router.navigate(['/']);
    this.showToolbarSidenav = false;
  }
}
