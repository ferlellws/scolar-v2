import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StrategicApproach } from '../models/strategic-approach';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StrategicApproachesService {

  private readonly API = `${environment.API}/strategic_approaches`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  getStrategicApproachesAll() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };

    return this.http.get<StrategicApproach[]>(`${this.API}/list`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicApproachesSelect() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };

    return this.http.get<StrategicApproach[]>(`${this.API}/select`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getStrategicApproachesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<StrategicApproach>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addStrategicApproaches(strategicApproach: StrategicApproach) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<StrategicApproach>(this.API, strategicApproach, httpOptions)
    .subscribe((data: StrategicApproach) => {
      this.emitAdd.emit(data);
    });
  }

  deleteStrategicApproachesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<StrategicApproach>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: StrategicApproach) => {
      this.emitDelete.emit(data);
    });
  }

  updateStrategicApproachesId(strategicApproach: StrategicApproach, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<StrategicApproach>(`${this.API}/${id}`, strategicApproach, httpOptions)
      .subscribe((data: StrategicApproach) => {
        this.emitModify.emit(data);
      });
  }

}
