import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PmoAssistantByPhase } from '../models/pmo-assistant-by-phase';

@Injectable({
  providedIn: 'root'
})
export class PmoAssistantByPhasesService {

  private readonly API = `${environment.API}/pmo_assistant_by_phases`;
  
  emitPmoAssistantByPhaseAdd = new EventEmitter<any>();
  emitPmoAssistantByPhaseUpdate = new EventEmitter<any>();
  emitPmoAssistantByPhaseDelete = new EventEmitter<any>();
  
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

  getPmoAssistantByPhaseByPhases() {
    return this.http.get<PmoAssistantByPhase[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  } 

  getPmoAssistantByPhaseByPhaseId(id: number) {
    return this.http.get<PmoAssistantByPhase[]>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPmoAssistantByPhasesByProjectByPmo(id_project: number, id_pmo: number) {
    return this.http.get<PmoAssistantByPhase[]>(`${this.API}/${id_project}/${id_pmo}/data_project_by_pmo_assistant`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addPmoAssistantByPhaseByPhase(pmo_assistant_by_phase: PmoAssistantByPhase) {
    return this.http.post<PmoAssistantByPhase>(this.API, { pmo_assistant_by_phase: pmo_assistant_by_phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssistantByPhaseAdd.emit(data);
        })
      );
  }

  updatePmoAssistantByPhase(pmo_assistant_by_phase: PmoAssistantByPhase, id: number) {
    return this.http.put<PmoAssistantByPhase>(`${this.API}/${id}`, pmo_assistant_by_phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssistantByPhaseUpdate.emit(data);
        })
      );
  }

  deletePmoAssistantByPhase(id: number) {
    return this.http.delete<PmoAssistantByPhase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPmoAssistantByPhaseDelete.emit(data);
        })
      );
  }
}
