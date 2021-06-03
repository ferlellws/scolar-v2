import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OperationSponsor } from '../models/operation-sponsor';

@Injectable({
  providedIn: 'root'
})
export class OperationSponsorsService {
  private readonly API = `${environment.API}/operation_sponsors`;
  
  emitOperationSponsorAdd = new EventEmitter<any>();
  emitOperationSponsorUpdate = new EventEmitter<any>();
  emitOperationSponsorDelete = new EventEmitter<any>();
  
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

  getOperationSponsorsAll() {
    return this.http.get<OperationSponsor[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getOperationSponsorId(id_project: number) {
    return this.http.get<OperationSponsor[]>(`${this.API}/${id_project}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getOperationSponsorProjectId(id_project: any) {
    return this.http.get<OperationSponsor[]>(`${this.API}/${id_project}/by_project`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getOperationSponsorByProjectIdWithDedication(id: number) {
    return this.http.get<any>(`${this.API}/${id}/by_project_with_dedication`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getOperationSponsorProjectIdActive(id_project: any) {
    return this.http.get<OperationSponsor[]>(`${this.API}/${id_project}/by_project_sponsor_active`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addOperationSponsor(operation_sponsor: OperationSponsor) {
    return this.http.post<OperationSponsor>(this.API, { operation_sponsor: operation_sponsor }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationSponsorAdd.emit(data);
        })
      );
  }

  updateOperationSponsor(operation_sponsor: OperationSponsor, id: number) {
    return this.http.put<OperationSponsor>(`${this.API}/${id}`, operation_sponsor, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationSponsorUpdate.emit(data);
        })
      );
  }

  deleteOperationSponsor(id: number) {
    return this.http.delete<OperationSponsor>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationSponsorDelete.emit(data);
        })
      );
  }
}
