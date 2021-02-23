import { environment } from 'src/environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Menu } from './models/menu';
import { User } from './models/user';
import { AuthService } from './services/auth/auth.service';
import { MenuService } from './services/menu.service';

export interface Page {
  id: number;
  title: string;
  description: string;
  sysmodule_id: number;
  route: string;
  order_menu: number;
  is_active: boolean;
  bg_color: string;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showFiller: boolean = true;
  title: string = 'tecno-project-front';
  authorized: boolean = false;
  // loading: boolean = true;

  lastname = 'Usuario';
  firstname = 'Tecno';
  menu: Menu [] = [];
  user!: User;

  showToolbarSidenav: boolean = false;
  entrySub: any;

  oOption!: Page;

  currentYear: number = new Date().getFullYear();

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
    // private _usersService: UserService
  ) { }

  ngOnInit() {
    let route;
    // console.log({route});
    // console.log(this.router.events);
    // this.router.events.subscribe(e => {
    //   if (e instanceof NavigationEnd) {
    //     route = e.url;
    //     this.menuService.getOptionByRoute(route);
    //   }
    // });

    // this.menuService.emitOption.subscribe(option => {
    //   this.oOption = option
    //   console.log("+++++++++++++++>>", this.oOption);
    // });

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

    // this.loading = false;

    if (localStorage.user) {
      this.user = new User(JSON.parse(localStorage.user));
    }

    // SE REVISA EL USUARIO DESDE EL AUTH A TRAVES DE UN EMIT
    this.authService.emitUser.subscribe(user => this.user = new User(user));
  }

  getRoute() {
    if (sessionStorage != null) {
      this.firstname = `${sessionStorage.firstname}`.split(" ")[0] || 'Usuario';
      this.lastname = `${sessionStorage.lastname}`.split(" ")[0] || 'Tecno';
      // this.user = {
      //   id: sessionStorage.id,
      //   firstname: this.firstname,
      //   lastname:this.lastname
      // }
    } else {
      this.firstname = 'Usuario';
      this.lastname = 'Tecno';
      // this.user = {
      //   id: 1,
      //   firstname: 'Ferley',
      //   lastname: 'León'
      // }
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

  onLink(route: string) {
    console.log({route});

    this.menuService.getOptionByRoute(route);
  }
}
