import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Valorem } from '../models/valorem';

@Injectable({
  providedIn: 'root'
})
export class ValoremService {
  private readonly API = `${environment.API}/valorem`;

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

  getValoremAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getCompaniesSelect() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };

    return this.http.get<Valorem[]>(`${this.API}/select`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getValoremId(id: number) {
    return this.http.get<Valorem>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addValorem(valorem: Valorem) {
    return this.http.post<Valorem>(this.API, { valorem: valorem }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateValoremId(valorem: Valorem, id: number) {
    return this.http.put<Valorem>(`${this.API}/${id}`, valorem, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusValorem(is_active: number, id: number) {

    return this.http.put<Valorem>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteValorem(id: number) {

    return this.http.put<Valorem>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteCompany(id: number) {
    return this.http.delete<Valorem>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }
}
