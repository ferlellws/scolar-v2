import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DelayTypification } from '../models/delay-typification';

@Injectable({
  providedIn: 'root'
})
export class DelayTypificationsService {
  private readonly API = `${environment.API}/delay_typifications`;

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

  getDelayTypifications() {
    return this.http.get<DelayTypification[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDelayTypificationsId(id: number) {
    return this.http.get<DelayTypification>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addDelayTypifications(delay_typifications: DelayTypification) {
    return this.http.post<DelayTypification>(this.API, { delay_typifications: delay_typifications }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateDelayTypificationsId(delay_typifications: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, delay_typifications, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteDelayTypifications(id: number) {
    return this.http.delete<DelayTypification>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
