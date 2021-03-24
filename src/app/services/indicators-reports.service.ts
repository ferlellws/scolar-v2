import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class IndicatorsReportsService {

  private readonly API = `${environment.API}/indicators_reports`;
  
  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  httpOptions!: any;

  constructor(
    private http: HttpClient
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bareer ${localStorage.token}`
        }),
        params: this.inputParams
      };
  }

  getTableStatesByVicepresidencies() {
    return this.http.get<TableData[]>(`${this.API}/statesByVicepresidencies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTableTypificationsByVicepresidencies() {
    return this.http.get<TableData[]>(`${this.API}/typificationsByVicepresidencies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTablePriorities() {
    return this.http.get<TableData[]>(`${this.API}/priorities`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPrograms() {
    return this.http.get<TableData[]>(`${this.API}/programs`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }


  getTableCompanies() {
    return this.http.get<TableData[]>(`${this.API}/companies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }
}
