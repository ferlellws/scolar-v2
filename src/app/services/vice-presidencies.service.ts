import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VicePresidency } from '../models/vice-presidency';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VicePresidenciesService {

  private readonly API = `${environment.API}/vice_presidencies`;

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

  getVicePresidenciesSelect() {

    return this.http.get<VicePresidency[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getVicePresidenciesAll() {

    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getVicePresidency(id: number) {

    return this.http.get<VicePresidency>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getProjectsByVicepresidency(id: number) {

    return this.http.get<VicePresidency>(`${this.API}/${id}/projects_by_vice_presidency`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getProjectsDashboard(own: boolean) {

    own  ? this.inputParams.own = 1 : this.inputParams.own = 0 ;
    return this.http.get<VicePresidency>(`${this.API}/projects`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addVicePresidency(vicePresidency: VicePresidency) {

    return this.http.post<VicePresidency>(this.API, { vice_presidency: vicePresidency }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateVicePresidency(vicePresidency: VicePresidency, id: number) {

    return this.http.put<VicePresidency>(`${this.API}/${id}`, vicePresidency, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusVicePresidency(is_active: number, id: number) {

    return this.http.put<VicePresidency>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteVicePresidency(id: number) {

    return this.http.put<VicePresidency>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteVicePresidency(id: number) {

    return this.http.delete<VicePresidency>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

}
