import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DelayCause } from '../models/delay-cause';

@Injectable({
  providedIn: 'root'
})
export class DelayCauseService {
  private readonly API = `${environment.API}/delay_causes`;

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

  getDelayCauses() {
    return this.http.get<DelayCause[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDelayCausesId(id: number) {
    return this.http.get<DelayCause>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDelayCauses(delay_causes: DelayCause) {
    return this.http.post<DelayCause>(this.API, { delay_causes: delay_causes }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateDelayCausesId(delay_causes: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, delay_causes, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDelayCauses(id: number) {
    return this.http.delete<DelayCause>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
