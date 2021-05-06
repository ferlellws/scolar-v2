import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SupportResource } from '../models/support-resource';

@Injectable({
  providedIn: 'root'
})
export class SupportResourcesService {
  private readonly API = `${environment.API}/support_resources`;
  
  emitSupportResourceAdd = new EventEmitter<any>();
  emitSupportResourceUpdate = new EventEmitter<any>();
  emitSupportResourceDelete = new EventEmitter<any>();
  
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
      }
    }

  getSupportResourcesAll() {
    return this.http.get<SupportResource[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getSupportResourceId(id_project: number) {
    return this.http.get<SupportResource[]>(`${this.API}/${id_project}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getSupportResourceProjectId(id_project: number) {
    return this.http.get<SupportResource[]>(`${this.API}/${id_project}/by_project/`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addSupportResource(support_resource: SupportResource) {
    return this.http.post<SupportResource>(this.API, { support_resource: support_resource }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSupportResourceAdd.emit(data);
        })
      );
  }

  updateSupportResource(support_resource: SupportResource, id: number) {
    return this.http.put<SupportResource>(`${this.API}/${id}`, support_resource, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSupportResourceUpdate.emit(data);
        })
      );
  }

  deleteSupportResource(id: number) {
    return this.http.delete<SupportResource>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSupportResourceDelete.emit(data);
        })
      );
  }
}
