import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DesviationCause } from '../models/desviation-cause';

@Injectable({
  providedIn: 'root'
})
export class DesviationCausesService {

  emitNew = new EventEmitter<any>();

  private readonly API = `${environment.API}/desviation_causes`;
  
  inputParams: any = {
    years: "",
    months: "",
    projects: "",
    typifications: "",
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

  getDesviationCauses() {
    return this.http.get<DesviationCause[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDesviationCausesTypificationsBySource() {
    return this.http.get<DesviationCause>(`${this.API}/totals_typifications_by_sources`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getDesviationCausesBySource(years: any, months: any, projects: any, typifications: any) {
    this.inputParams.years = years
    this.inputParams.months = months
    this.inputParams.projects = projects
    this.inputParams.typifications = typifications
    
    return this.http.get<DesviationCause>(`${this.API}/data_table_source_report`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getDesviationCausesByTypifications(years: any, months: any, projects: any, typifications: any) {
    this.inputParams.years = years
    this.inputParams.months = months
    this.inputParams.projects = projects
    this.inputParams.typifications = typifications
    return this.http.get<DesviationCause>(`${this.API}/data_table_typifications_report`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getDesviationCausesByVicepresidencies(years: any, months: any, projects: any, typifications: any) {
    this.inputParams.years = years
    this.inputParams.months = months
    this.inputParams.projects = projects
    this.inputParams.typifications = typifications
    return this.http.get<DesviationCause>(`${this.API}/data_table_vicepresidencies_report`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getDesviationCausesByAreas(years: any, months: any, projects: any, typifications: any) {
    this.inputParams.years = years
    this.inputParams.months = months
    this.inputParams.projects = projects
    this.inputParams.typifications = typifications
    return this.http.get<DesviationCause>(`${this.API}/data_table_areas_report`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    )
  }

  getDesviationCausesByProject(id: number) {
    
    return this.http.get<any>(`${this.API}/by_project/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDesviationCausesId(id: number) {
    return this.http.get<DesviationCause>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDesviationCauses(desviation_cause: DesviationCause) {
    return this.http.post<DesviationCause>(this.API, { desviation_cause: desviation_cause }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data)
        })
      );
  }

  updateDesviationCausesId(desviation_causes: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, desviation_causes, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDesviationCauses(id: number) {
    return this.http.delete<DesviationCause>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

}
