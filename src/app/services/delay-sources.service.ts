import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DelaySource } from '../models/delay-source';

@Injectable({
  providedIn: 'root'
})
export class DelaySourcesService {
  private readonly API = `${environment.API}/delay_sources`;

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

  getDelaySources() {
    return this.http.get<DelaySource[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDelaySourcesId(id: number) {
    return this.http.get<DelaySource>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDelaySources(delay_sources: DelaySource) {
    return this.http.post<DelaySource>(this.API, { delay_sources: delay_sources }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateDelaySourcesId(delay_sources: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, delay_sources, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDelaySources(id: number) {
    return this.http.delete<DelaySource>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
