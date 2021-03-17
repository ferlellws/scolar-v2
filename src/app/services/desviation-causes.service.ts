import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DesviationCause } from '../models/desviation-cause';

@Injectable({
  providedIn: 'root'
})
export class DesviationCausesService {
  private readonly API = `${environment.API}/desviation_causes`;

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

  getDesviationCauses() {
    return this.http.get<DesviationCause[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDesviationCausesBySource() {
    return this.http.get<DesviationCause>(`${this.API}/data_table_report`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
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

  addDesviationCauses(desviation_causes: DesviationCause) {
    return this.http.post<DesviationCause>(this.API, { desviation_causes: desviation_causes }, this.httpOptions)
      .pipe(
        tap((data: any) => {
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