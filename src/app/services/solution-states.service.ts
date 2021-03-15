import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SolutionState } from '../models/solution-state';

@Injectable({
  providedIn: 'root'
})
export class SolutionStatesService {
  private readonly API = `${environment.API}/solution_states`;

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

  getSolutionStates() {
    return this.http.get<SolutionState[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getSolutionStatesId(id: number) {
    return this.http.get<SolutionState>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addSolutionStates(solution_states: SolutionState) {
    return this.http.post<SolutionState>(this.API, { solution_states: solution_states }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateSolutionStatesId(solution_states: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, solution_states, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteSolutionStates(id: number) {
    return this.http.delete<SolutionState>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
