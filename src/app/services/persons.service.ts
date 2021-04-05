import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private readonly API = `${environment.API}/people`;

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

  getManagers() {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions = {
      params: this.inputParams
    }
    return this.http.get<Person[]>(`${this.API}/managers`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getFunctionalLeaders() {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions = {
      params: this.inputParams
    }
    return this.http.get<Person[]>(`${this.API}/functional_leaders`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }
  
  getFunctionalResources() {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions = {
      params: this.inputParams
    }
    return this.http.get<Person[]>(`${this.API}/functional_resources`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

}
