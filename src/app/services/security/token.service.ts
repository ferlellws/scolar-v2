import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly API = `${environment.API}/sysuser_token`;

  constructor(
    private http: HttpClient,
    private _usersService: UserService
  ) { }

  async getToken(credentials: any): Promise<boolean> {
    const t = await this.http.post<any>(this.API, credentials,{observe: 'response'})
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).toPromise().catch(error => {return false});
    if(t.status == 201) {
      sessionStorage.token = t.body.jwt;
      sessionStorage.id = this.getDecodedAccessToken(sessionStorage.token).sub;
      const user = await this._usersService.getUser(sessionStorage.id).toPromise();
      sessionStorage.login_name = user.login_name;
      sessionStorage.firstname = user.firstname;
      sessionStorage.lastname = user.lastname;
      sessionStorage.email = user.email;
      sessionStorage.sysrole_id = user.sysrole_id;
      console.log(sessionStorage);
      return true;
    }else {
      return false;
    }
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

}
