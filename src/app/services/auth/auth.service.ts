import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
// import { UserLogin } from 'src/app/models/user-login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticatedUser: boolean = false;
  private readonly urlApi = environment.API;
  showToolbarSidenav = new EventEmitter<boolean>();
  emitUser = new EventEmitter<User>();

  userToken: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bareer ${localStorage.token}`
    })
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    console.log("OnInit AuthService");
    this.getToken();

    if (localStorage.user) {
      this.emitUser.emit(JSON.parse(localStorage.user));
    }
  }

  onLogin(user: User) {
    return this.http.post(`${ this.urlApi }/sign_in`, { user }, this.httpOptions )
      .pipe(
      //   // catchError(this.handleError)
        tap((res: any) => {
          console.log(">>", res);
          this.userAuthenticated(res.is_success);
          this.emitUser.emit(res.data.user);
          this.router.navigate(['/home']);
          localStorage.user = JSON.stringify(res.data.user);
          this.saveToken(res.data.user.authentication_token);
        })
      );

    // if (userLogin.email === 'ferlellws@gmail.com' &&
    //   userLogin.password === '12345678') {
    //   this.authenticatedUser = true;
    //   this.router.navigate(['/home']);
    // } else {
    //   this.authenticatedUser = false;
    // }
  }

  onLogout() {
    this.authenticatedUser = false;
    this.showToolbarSidenav.emit(this.authenticatedUser);
  }

  async userIsAuthenticated(path: string) {
    if (this.authenticatedUser){
      let partes = path.split("/")
      environment.consoleMessage(partes, "ruta: ");
      let contador = 0;
      let backRoute = "";
      for (let index = 0; index < partes!.length; index++) {
        if(partes![index][0] == ":"){
          contador++;
          backRoute += `/param${contador}`;
        }else{
          backRoute += `/${partes![index]}`
        }
      }
      environment.consoleMessage(backRoute, "ruta: ");
      console.log('antes del await');
      
      var coso = await this.accessPage(backRoute);
      environment.consoleMessage(coso, "coso >>>>>>>>>")
      localStorage.access_to_accions = JSON.stringify(coso.access_to_accions)
    }
    return this.authenticatedUser;
  }

  userAuthenticated(authenticatedUser: boolean) {
    console.log({authenticatedUser});

    this.authenticatedUser = authenticatedUser;
    console.log("////", this.authenticatedUser);

    this.showToolbarSidenav.emit(this.authenticatedUser);
  }

  private saveToken( idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('userToken', idToken);
  }

  getToken() {
    if (localStorage.getItem('userToken')) {

      this.userToken = localStorage.getItem('userToken') || "";
      this.userAuthenticated(true);
    } else {
      this.userToken = "";
      this.userAuthenticated(false);
    }

    return this.userToken;
  }

  async accessPage(route: string): Promise<any> {
    var inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token,
      route: route
    };

    var Options = {
      params: inputParams
    }

    const t =  this.http.get<any>(`${environment.API}/pages_profiles/access_permissions`, Options)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).toPromise();
    return t;
  }
}
