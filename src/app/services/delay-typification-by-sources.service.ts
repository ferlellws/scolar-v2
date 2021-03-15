import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DelayTypificationBySource } from '../models/delay-typification-by-source';

@Injectable({
  providedIn: 'root'
})
export class DelayTypificationBySourcesService {
  private readonly API = `${environment.API}/delay_typification_by_sources`;

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

  getDelayTypificationBySources() {
    return this.http.get<DelayTypificationBySource[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDelayTypificationBySourcesId(id: number) {
    return this.http.get<DelayTypificationBySource>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDelayTypificationBySources(delay_typification_by_sources: DelayTypificationBySource) {
    return this.http.post<DelayTypificationBySource>(this.API, { delay_typification_by_sources: delay_typification_by_sources }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateDelayTypificationBySourcesId(delay_typification_by_sources: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, delay_typification_by_sources, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDelayTypificationBySources(id: number) {
    return this.http.delete<DelayTypificationBySource>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
