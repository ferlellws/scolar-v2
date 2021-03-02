import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { State } from '../models/state';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private readonly API = `${environment.API}/states`;

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

  getStatesAll() {

    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStatesSelect() {

    return this.http.get<State[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  
  }

  getStatesId(id: number) {
    return this.http.get<State>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  addStates(state: State) {
    return this.http.post<State>(this.API, { state: state }, this.httpOptions)
    .pipe(
      tap((data: any) => {
        this.emitDataTable.emit(data);
      })
      );
    }
    
  updateStatesId(state: State, id: number) {
    return this.http.put<State>(`${this.API}/${id}`, state, this.httpOptions)
    .pipe(
      tap((data: any) => {
        this.emitDataTable.emit(data);
      })
    );
  }

  updateStatusState(is_active: number, id: number) {
    return this.http.put<State>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }


  logicalDeleteState(id: number) {
    return this.http.put<State>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }


  deleteStatesId(id: number) {
    return this.http.delete<State>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      tap((data: any) => {
        this.emitDataTable.emit(data);
      })
    );
  }

}
