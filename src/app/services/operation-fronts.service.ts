import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OperationFront } from '../models/operation-front';

@Injectable({
  providedIn: 'root'
})
export class OperationFrontsService {
  private readonly API = `${environment.API}/operation_fronts`;
  
  emitOperationFrontAdd = new EventEmitter<any>();
  emitOperationFrontUpdate = new EventEmitter<any>();
  emitOperationFrontDelete = new EventEmitter<any>();
  
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

  getOperationFrontsAll() {
    return this.http.get<OperationFront[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getOperationFrontId(id_project: number) {
    return this.http.get<OperationFront[]>(`${this.API}/${id_project}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addOperationFront(operation_front: OperationFront) {
    return this.http.post<OperationFront>(this.API, { operation_front: operation_front }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationFrontAdd.emit(data);
        })
      );
  }

  updateOperationFront(operation_front: OperationFront, id: number) {
    return this.http.put<OperationFront>(`${this.API}/${id}`, operation_front, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationFrontUpdate.emit(data);
        })
      );
  }

  deleteOperationFront(id: number) {
    return this.http.delete<OperationFront>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitOperationFrontDelete.emit(data);
        })
      );
  }

}
