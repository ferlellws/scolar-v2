import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private readonly API = `${environment.API}/applications`;

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

  getApplicationsAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getApplicationsSelect() {
    return this.http.get<Application[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getApplicationsId(id: number) {
    return this.http.get<Application>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addApplications(application: Application) {
    return this.http.post<Application>(this.API, { application: application }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateApplicationId(application: Application, id: number) {
    return this.http.put<Application>(`${this.API}/${id}`, application, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusApplication(is_active: number, id: number) {
    return this.http.put<Application>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteApplication(id: number) {
    return this.http.put<Application>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteApplication(id: number) {
    return this.http.delete<Application>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

}
