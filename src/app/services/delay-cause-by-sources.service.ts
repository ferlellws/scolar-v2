import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DelayCauseBySource } from '../models/delay-cause-by-source';

@Injectable({
  providedIn: 'root'
})
export class DelayCauseBySourceBySourcesService {
  private readonly API = `${environment.API}/delay_cause_by_sources`;

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

  getDelayCauseBySources() {
    return this.http.get<DelayCauseBySource[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDelayCauseBySourcesId(id: number) {
    return this.http.get<DelayCauseBySource>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDelayCauseBySources(delay_cause_by_sources: DelayCauseBySource) {
    return this.http.post<DelayCauseBySource>(this.API, { delay_cause_by_sources: delay_cause_by_sources }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateDelayCauseBySourcesId(delay_cause_by_sources: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, delay_cause_by_sources, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDelayCauseBySources(id: number) {
    return this.http.delete<DelayCauseBySource>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
