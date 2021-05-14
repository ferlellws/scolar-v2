import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PhaseByProject } from '../models/phase-by-project';
import { TestUser } from '../models/test-user';

@Injectable({
  providedIn: 'root'
})
export class PhaseByProjectsService {
  private readonly API = `${environment.API}/phase_by_projects`;
  
  emitPhaseByProjectAdd = new EventEmitter<any>();
  emitPhaseByProjectUpdate = new EventEmitter<any>();
  emitPhaseByProjectDelete = new EventEmitter<any>();
  
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

  getPhaseByProjectsAll() {
    return this.http.get<PhaseByProject[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  } 

  getPhaseByProjectId(id_project: number) {
    return this.http.get<PhaseByProject[]>(`${this.API}/${id_project}/phases_date_range`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addPhaseByProjects(phase_by_project: PhaseByProject) {
    return this.http.post<PhaseByProject>(this.API, { phase_by_project: phase_by_project }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPhaseByProjectAdd.emit(data);
        })
      );
  }

  updatePhaseByProject(phase_by_project: PhaseByProject, id: number) {
    return this.http.put<PhaseByProject>(`${this.API}/${id}`, phase_by_project, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPhaseByProjectUpdate.emit(data);
        })
      );
  }

  deletePhaseByProject(id: number) {
    return this.http.delete<PhaseByProject>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitPhaseByProjectDelete.emit(data);
        })
      );
  }
}