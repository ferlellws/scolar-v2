import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Phase } from '../models/phase';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class PhasesService {

  private readonly API = `${environment.API}/phases`;

  emitDataTable = new EventEmitter<any>();

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

  getPhasesAll() {
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPhasesSelect() {
    return this.http.get<Phase[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPhasesId(id: number) {
    return this.http.get<Phase>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  addPhases(phase: Phase) {
    return this.http.post<Phase>(this.API, { phase: phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updatePhaseId(phase: Phase, id: number) {
    return this.http.put<Phase>(`${this.API}/${id}`, phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusPhase(is_active: number, id: number) {
    return this.http.put<Phase>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeletePhase(id: number) {
    return this.http.put<Phase>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deletePhase(id: number) {
    return this.http.delete<Phase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

}
