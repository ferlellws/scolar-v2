import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Menu } from '../models/menu';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {};

  private readonly API = `${environment.API}/sysusers`;

  constructor(private http: HttpClient) { }

  getUsers() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<User[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getUser(id: number){
    console.log(`Bareer ${sessionStorage.token}`);
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.get<User>(`${this.API}/${id}`,this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  async getAuth(): Promise<boolean>{

    if(sessionStorage.token == null) {
      return false;
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    const t =  await this.http.get<any>(`${this.API}/auth`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).toPromise();

      if(t.status == 200) {
        return true;
      }else {
        return false;
      }
  }

  async getMenu(): Promise<Menu[]> {

    if (sessionStorage.id == null) {
      return null;
    } else {
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bareer ${sessionStorage.token}`
        })
      };
      const t = await this.http.get<Menu[]>(`${this.API}/menu_user/${sessionStorage.id}`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      ).toPromise();
      return t;
    }

  }

}
