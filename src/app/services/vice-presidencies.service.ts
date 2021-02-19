import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VicePresidency } from '../models/vice-presidency';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VicePresidenciesService {

  private readonly API = `${environment.API}/vice_presidencies`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getVicePresidenciesAll() {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<VicePresidency[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getVicePresidenciesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<VicePresidency>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addVicePresidencies(vicePresidency: VicePresidency) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<VicePresidency>(this.API, vicePresidency, httpOptions)
    .subscribe((data: VicePresidency) => {
      this.emitAdd.emit(data);
    });
  }

  deleteVicePresidenciesId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<VicePresidency>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: VicePresidency) => {
      this.emitDelete.emit(data);
    });
  }

  updateVicePresidenciesId(vicePresidency: VicePresidency, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<VicePresidency>(`${this.API}/${id}`, vicePresidency, httpOptions)
      .subscribe((data: VicePresidency) => {
        this.emitModify.emit(data);
      });
  }

}
