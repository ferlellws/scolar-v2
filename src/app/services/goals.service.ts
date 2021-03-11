import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Goal } from '../models/goal';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private readonly API = `${environment.API}/goals`;

  emitGoal = new EventEmitter<any>();
  emitGoalDelete = new EventEmitter<any>();

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

  getGoalsSelect() {
    return this.http.get<Goal[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getGoalsAll() {
    return this.http.get<TableData[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getGoalId(id: number) {
    return this.http.get<Goal>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitGoal.emit(data);
      })
    );
  }

  getGoalsByWeeks(id: number) {
    return this.http.get<Goal[]>(`${this.API}/projects/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitGoal.emit(data);
      })
    );
  }

  addGoal(goal: Goal) {
    return this.http.post<Goal>(this.API, { goal: goal }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitGoal.emit(data);
        })
      );
  }

  updateGoal(goal: Goal, id: number) {

    return this.http.put<Goal>(`${this.API}/${id}`, goal, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitGoal.emit(data);
        })
      );
  }

  updateStatuGoal(is_active: number, id: number) {
    return this.http.put<Goal>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitGoal.emit(data);
        })
      );
  }
  
  logicalDeleteGoal(id: number) {
    return this.http.put<Goal>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitGoalDelete.emit(data);
        })
      );
  }

  deleteGoal(id: number) {

    return this.http.delete<Goal>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitGoalDelete.emit(data);
        })
      );
  }
}
