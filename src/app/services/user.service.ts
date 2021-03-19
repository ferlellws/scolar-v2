import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Menu } from '../models/menu';
import { TableData } from '../models/table-data';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private readonly API = `${environment.API}/users`;
  
  emitDataTable = new EventEmitter<any>();
  
  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };
  
  httpOptions = {};


  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: this.inputParams
    };
  }

  getUsers() {
    return this.http.get<User[]>(this.API, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getUsersTable(){
    return this.http.get<TableData[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getUsersId(id: number) {
    return this.http.get<User>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addUser(user: User) {
    return this.http.post<User>(this.API, { user: user }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateUser(user: User, id: number) {
    return this.http.put<User>(`${this.API}/${id}`, user, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusUser(is_active: number, id: number) {

    return this.http.put<User>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  getManagers() {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions = {
      params: this.inputParams
    }
    return this.http.get<User[]>(`${this.API}/managers`, this.httpOptions)
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
      return [];
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
