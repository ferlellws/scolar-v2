import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StrategicGuidelines } from '../models/strategic-guidelines';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class StrategicGuidelinesService {

  private readonly API = `${environment.API}/strategic_guidelines`;

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

  getStrategicGuidelinesAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicGuidelinesSelect() {
    return this.http.get<StrategicGuidelines[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicGuidelinesId(id: number) {
    return this.http.get<StrategicGuidelines>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addStrategicGuidelines(strategic_guideline: StrategicGuidelines) {
    return this.http.post<StrategicGuidelines>(this.API, { strategic_guideline: strategic_guideline }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStrategicGuidelineId(strategic_guideline: StrategicGuidelines, id: number) {
    return this.http.put<StrategicGuidelines>(`${this.API}/${id}`, strategic_guideline, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusStrategicGuideline(is_active: number, id: number) {
    return this.http.put<StrategicGuidelines>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteStrategicGuideline(id: number) {
    return this.http.put<StrategicGuidelines>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteStrategicGuideline(id: number) {
    return this.http.delete<StrategicGuidelines>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

}
