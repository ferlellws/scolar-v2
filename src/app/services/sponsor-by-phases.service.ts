import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SponsorByPhase } from '../models/sponsor-by-phase';

@Injectable({
  providedIn: 'root'
})
export class SponsorByPhasesService {

  private readonly API = `${environment.API}/sponsor_by_phases`;
  
  emitSponsorByPhaseAdd = new EventEmitter<any>();
  emitSponsorByPhaseUpdate = new EventEmitter<any>();
  emitSponsorByPhaseDelete = new EventEmitter<any>();
  
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

  getSponsorByPhases() {
    return this.http.get<SponsorByPhase[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  } 

  getSponsorByPhasesByProjectBySponsor(id_project: number, id_sponsor: number) {
    return this.http.get<SponsorByPhase[]>(`${this.API}/${id_project}/${id_sponsor}/data_project_by_sponsor`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getSponsorByPhaseId(id: number) {
    return this.http.get<SponsorByPhase[]>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addSponsorByPhase(sponsor_by_phase: SponsorByPhase) {
    return this.http.post<SponsorByPhase>(this.API, { sponsor_by_phase: sponsor_by_phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSponsorByPhaseAdd.emit(data);
        })
      );
  }

  updateSponsorByPhase(sponsor_by_phase: SponsorByPhase, id: number) {
    return this.http.put<SponsorByPhase>(`${this.API}/${id}`, sponsor_by_phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSponsorByPhaseUpdate.emit(data);
        })
      );
  }

  deleteSponsorByPhase(id: number) {
    return this.http.delete<SponsorByPhase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitSponsorByPhaseDelete.emit(data);
        })
      );
  }

  deleteDataSponsorByProject(id_project: number, id_sponsor: number){
    return this.http.delete<SponsorByPhase>(`${this.API}/${id_project}/${id_sponsor}/delete_data_sponsor_by_project`, this.httpOptions)
    .pipe(
      tap((data: any) => {
        this.emitSponsorByPhaseDelete.emit(data);
      })
    );
  }
}
