import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { State } from '../models/state';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  private readonly API = `${environment.API}/applications`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getApplicationsAll() {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<State[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getApplicationsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<State>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addApplications(state: State) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<State>(this.API, state, httpOptions)
    .subscribe((data: State) => {
      this.emitAdd.emit(data);
    });
  }

  deleteApplicationsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<State>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: State) => {
      this.emitDelete.emit(data);
    });
  }

  updateApplicationsId(state: State, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<State>(`${this.API}/${id}`, state, httpOptions)
      .subscribe((data: State) => {
        this.emitModify.emit(data);
      });
  }

}
