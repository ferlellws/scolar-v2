import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LeaderByPhase } from '../models/leader-by-phase';
import { SponsorByPhase } from '../models/sponsor-by-phase';

@Injectable({
  providedIn: 'root'
})
export class LeaderByPhasesService {

  private readonly API = `${environment.API}/leader_by_phases`;
  
  emitLeaderByPhaseAdd = new EventEmitter<any>();
  emitLeaderByPhaseUpdate = new EventEmitter<any>();
  emitLeaderByPhaseDelete = new EventEmitter<any>();
  
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

  getLeaderByPhases() {
    return this.http.get<LeaderByPhase[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  } 

  getLeaderByPhaseId(id: number) {
    return this.http.get<LeaderByPhase[]>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getLeaderByPhasesByProjectByLeader(id_project: number, id_functional_leader: number) {
    return this.http.get<SponsorByPhase[]>(`${this.API}/${id_project}/${id_functional_leader}/data_project_by_leader`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addLeaderByPhase(leader_by_phase: LeaderByPhase) {
    return this.http.post<LeaderByPhase>(this.API, { leader_by_phase: leader_by_phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitLeaderByPhaseAdd.emit(data);
        })
      );
  }

  updateLeaderByPhase(leader_by_phase: LeaderByPhase, id: number) {
    return this.http.put<LeaderByPhase>(`${this.API}/${id}`, leader_by_phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitLeaderByPhaseUpdate.emit(data);
        })
      );
  }

  deleteLeaderByPhase(id: number) {
    return this.http.delete<LeaderByPhase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitLeaderByPhaseDelete.emit(data);
        })
      );
  }
}
