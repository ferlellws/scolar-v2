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

  getTableStatesByVicepresidencies(years: any) {
    this.inputParams.years = years;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<TableData[]>(`${this.API}/states_by_vicepresidencies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTableTypificationsByVicepresidencies(years: any, status: any) {
    this.inputParams.years = years;
    this.inputParams.status = status;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<TableData[]>(`${this.API}/typifications_by_vicepresidencies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTablePriorities(years: any, status: any) {
    this.inputParams.years = years;
    this.inputParams.status = status;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<TableData[]>(`${this.API}/priorities`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getAdvancePercentagesByProjects(years: any, states: any) {
    this.inputParams.years = years;
    this.inputParams.states = states;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<any[]>(`${this.API}/advance_percentages_by_projects`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getAreas(years: any, states: any) {
    this.inputParams.years = years;
    this.inputParams.states = states;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<any[]>(`${this.API}/advance_percentages_by_projects`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPrograms(years: any, states: any, pmos: any) {
    this.inputParams.years = years;
    this.inputParams.states = states;
    this.inputParams.pmos = pmos;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<TableData[]>(`${this.API}/programs`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTableCompanies(years: any, states: any) {
    this.inputParams.years = years;
    this.inputParams.states = states;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<TableData[]>(`${this.API}/companies_by_periods`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPmoByOccupation(years: any, states: any){
    this.inputParams.years = years;
    this.inputParams.states = states;
    environment.consoleMessage(this.inputParams, "INPUT PARAMS");
    return this.http.get<any>(`${this.API}/pmo_by_occupation`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

}
