import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private readonly API = `${environment.API}/companies`;
  constructor(private http: HttpClient) { }

  getCompanies() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Company[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getSponsorsCompanies() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Company[]>(`${this.API}/sponsors`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDevelopersCompanies() {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Company[]>(`${this.API}/developers`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

}
