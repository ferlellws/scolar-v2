import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PmoAssignedByPhase } from '../models/pmo-assigned-by-phase';

@Injectable({
  providedIn: 'root'
})
export class PmoAssignedByPhaseByPhasesService {

  private readonly API = `${environment.API}/pmo_assigned_by_phases`;
  
  emitPmoAssignedByPhaseAdd = new EventEmitter<any>();
  emitPmoAssignedByPhaseUpdate = new EventEmitter<any>();
  emitPmoAssignedByPhaseDelete = new EventEmitter<any>();
  
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

  getPmoAssignedByPhaseByPhases() {
    return this.http.get<PmoAssignedByPhase[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  } 

  getPmoAssignedByPhaseByPhaseId(id: number) {
    return this.http.get<PmoAssignedByPhase[]>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPmoAssignedByPhasesByProjectByPmo(id_project: number, id_pmo: number) {
    return this.http.get<PmoAssignedByPhase[]>(`${this.API}/${id_project}/${id_pmo}/data_project_by_pmo_assigned`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addPmoAssignedByPhaseByPhase(pmo_assigned_by_phase: PmoAssignedByPhase) {
    return this.http.post<PmoAssignedByPhase>(this.API, { pmo_assigned_by_phase: pmo_assigned_by_phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssignedByPhaseAdd.emit(data);
        })
      );
  }

  updatePmoAssignedByPhase(pmo_assigned_by_phase: PmoAssignedByPhase, id: number) {
    return this.http.put<PmoAssignedByPhase>(`${this.API}/${id}`, pmo_assigned_by_phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssignedByPhaseUpdate.emit(data);
        })
      );
  }

  deletePmoAssignedByPhase(id: number) {
    return this.http.delete<PmoAssignedByPhase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssignedByPhaseDelete.emit(data);
        })
      );
  }
}
