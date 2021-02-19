import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application';
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

    return this.http.get<Application[]>(this.API, httpOptions)
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

    return this.http.get<Application>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addApplications(application: Application) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<Application>(this.API, application, httpOptions)
    .subscribe((data: Application) => {
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

    return this.http.delete<Application>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: Application) => {
      this.emitDelete.emit(data);
    });
  }

  updateApplicationsId(application: Application, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<Application>(`${this.API}/${id}`, application, httpOptions)
      .subscribe((data: Application) => {
        this.emitModify.emit(data);
      });
  }

}
