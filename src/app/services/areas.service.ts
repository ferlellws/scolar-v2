import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Area } from '../models/area';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private readonly API = `${environment.API}/areas`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getAreasAll() {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Area[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getAreasId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Area>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addAreas(area: Area) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<Area>(this.API, area, httpOptions)
    .subscribe((data: Area) => {
      this.emitAdd.emit(data);
    });
  }

  deleteAreasId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<Area>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: Area) => {
      this.emitDelete.emit(data);
    });
  }

  updateAreasId(area: Area, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<Area>(`${this.API}/${id}`, area, httpOptions)
      .subscribe((data: Area) => {
        this.emitModify.emit(data);
      });
  }

}
