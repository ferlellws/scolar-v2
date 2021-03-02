import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Priority } from '../models/priority';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {

  private readonly API = `${environment.API}/priorities`;

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

  getPrioritiesAll() {

    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPrioritiesSelect() {

    return this.http.get<Priority[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPrioritiesId(id: number) {
    return this.http.get<Priority>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addPriorities(priority: Priority) {
    return this.http.post<Priority>(this.API, { priority: priority }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updatePrioritiesId(priority: Priority, id: number) {
    return this.http.put<Priority>(`${this.API}/${id}`, priority, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusPriority(is_active: number, id: number) {

    return this.http.put<Priority>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeletePriority(id: number) {

    return this.http.put<Priority>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deletePrioritiesId(id: number) {
    return this.http.delete<Priority>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }
  

}
