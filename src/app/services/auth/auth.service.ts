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
  }

  onLogin(user: User) {
    return this.http.post(`${ this.urlApi }/sign_in`, { user }, this.httpOptions )
      .pipe(
      //   // catchError(this.handleError)
        tap((res: any) => {
          console.log(">>>>>", res);
          this.userAuthenticated(res.is_success);
          this.router.navigate(['/home']);
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

  userIsAuthenticated() {
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
      console.log(">>>>>>1");

      this.userToken = localStorage.getItem('userToken') || "";
      this.userAuthenticated(true);
    } else {
      console.log(">>>>>>2");
      this.userToken = "";
      this.userAuthenticated(false);
    }

    return this.userToken;
  }
}
