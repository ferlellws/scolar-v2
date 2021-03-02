import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StrategicApproach } from '../models/strategic-approach';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class StrategicApproachesService {

  private readonly API = `${environment.API}/strategic_approaches`;

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

  getStrategicApproachesAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicApproachesSelect() {
    return this.http.get<StrategicApproach[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicApproachesId(id: number) {
    return this.http.get<StrategicApproach>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addStrategicApproaches(strategicApproach: StrategicApproach) {
    return this.http.post<StrategicApproach>(this.API, { strategic_approach: strategicApproach }, this.httpOptions)
    .pipe(
      tap((data: any) => {
        this.emitDataTable.emit(data);
      })
    );
  }

  updateStrategicApproachesId(strategicApproach: StrategicApproach, id: number) {
    return this.http.put<StrategicApproach>(`${this.API}/${id}`, strategicApproach, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusStrategicApproach(is_active: number, id: number) {
    return this.http.put<StrategicApproach>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteStrategicApproach(id: number) {
    return this.http.put<StrategicApproach>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteStrategicApproachesId(id: number) {
    return this.http.delete<StrategicApproach>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }
  
}
