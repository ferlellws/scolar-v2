import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observation } from '../models/observation';

@Injectable({
  providedIn: 'root'
})
export class ObservationsService {

  private readonly API = `${environment.API}/observations`;

  emitObservations = new EventEmitter<any>();
  emitObservationsDelete = new EventEmitter<any>();

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

  getObservationsSelect() {
    return this.http.get<Observation[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getObservationsAll() {
    return this.http.get<TableData[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getObservationId(id: number) {
    return this.http.get<Observation>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitObservations.emit(data);
      })
    );
  }

  getObservationsByWeeks(id: number) {
    return this.http.get<Observation[]>(`${this.API}/projects/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitObservations.emit(data);
      })
    );
  }

  addObservation(observation: Observation) {
    return this.http.post<Observation>(this.API, { observation: observation }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitObservations.emit(data);
        })
      );
  }

  updateObservation(observation: Observation, id: number) {

    return this.http.put<Observation>(`${this.API}/${id}`, observation, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitObservations.emit(data);
        })
      );
  }

  updateStatuObservation(is_active: number, id: number) {
    return this.http.put<Observation>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitObservations.emit(data);
        })
      );
  }
  
  logicalDeleteObservation(id: number) {
    return this.http.put<Observation>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitObservationsDelete.emit(data);
        })
      );
  }

  deleteObservation(id: number) {

    return this.http.delete<Observation>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitObservationsDelete.emit(data);
        })
      );
  }
}
