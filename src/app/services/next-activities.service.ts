import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NextActivity } from '../models/next-activity';

@Injectable({
  providedIn: 'root'
})
export class NextActivitiesService {
  private readonly API = `${environment.API}/next_activities`;

  emitNextActivities = new EventEmitter<any>();
  emitNextActivitiesDelete = new EventEmitter<any>();

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

  getNextActivitiesSelect() {
    return this.http.get<NextActivity[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getNextActivitiesAll() {
    return this.http.get<TableData[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getNextActivityId(id: number) {
    return this.http.get<NextActivity>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitNextActivities.emit(data);
      })
    );
  }

  getNextActivitiesByWeeks(id: number) {
    return this.http.get<NextActivity[]>(`${this.API}/projects/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitNextActivities.emit(data);
      })
    );
  }

  addNextActivity(next_activity: NextActivity) {
    return this.http.post<NextActivity>(this.API, { next_activity: next_activity }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNextActivities.emit(data);
        })
      );
  }

  updateNextActivity(next_activity: NextActivity, id: number) {

    return this.http.put<NextActivity>(`${this.API}/${id}`, next_activity, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNextActivities.emit(data);
        })
      );
  }

  updateStatuNextActivity(is_active: number, id: number) {
    return this.http.put<NextActivity>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNextActivities.emit(data);
        })
      );
  }
  
  logicalDeleteNextActivity(id: number) {
    return this.http.put<NextActivity>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNextActivitiesDelete.emit(data);
        })
      );
  }

  deleteNextActivity(id: number) {

    return this.http.delete<NextActivity>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNextActivitiesDelete.emit(data);
        })
      );
  }
}
