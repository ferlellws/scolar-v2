import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateByPhase } from '../models/state-by-phase';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateByPhasesService {

  private readonly API = `${environment.API}/state_by_phases`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getStateByPhasesAll() {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<StateByPhase[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStateByPhasesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<StateByPhase>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addStateByPhases(stateByPhase: StateByPhase) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<StateByPhase>(this.API, stateByPhase, httpOptions)
    .subscribe((data: StateByPhase) => {
      this.emitAdd.emit(data);
    });
  }

  deleteStateByPhasesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<StateByPhase>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: StateByPhase) => {
      this.emitDelete.emit(data);
    });
  }

  updateStateByPhasesId(stateByPhase: StateByPhase, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<StateByPhase>(`${this.API}/${id}`, stateByPhase, httpOptions)
      .subscribe((data: StateByPhase) => {
        this.emitModify.emit(data);
      });
  }

}
