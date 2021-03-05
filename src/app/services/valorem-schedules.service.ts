import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ValoremSchedule } from '../models/valorem-schedule';

@Injectable({
  providedIn: 'root'
})
export class ValoremSchedulesService {

  private readonly API = `${environment.API}/external_company_schedules`;

  emitDataTable = new EventEmitter<any>();

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

  getValoremSchedulesAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getValoremSchedulesSelect() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };

    return this.http.get<ValoremSchedule[]>(`${this.API}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getValoremStatesId(id: number) {
    return this.http.get<ValoremSchedule>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addValoremState(valorem_schedule: ValoremSchedule) {
    return this.http.post<ValoremSchedule>(this.API, { valorem_schedule: valorem_schedule }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateCompaniesId(valorem_schedule: ValoremSchedule, id: number) {
    return this.http.put<ValoremSchedule>(`${this.API}/${id}`, valorem_schedule, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusValoremState(is_active: number, id: number) {

    return this.http.put<ValoremSchedule>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteCompany(id: number) {

    return this.http.put<ValoremSchedule>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteCompany(id: number) {
    return this.http.delete<ValoremSchedule>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }
}
