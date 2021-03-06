import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResourceByPhase } from '../models/resource-by-phase';
import { TestUser } from '../models/test-user';

@Injectable({
  providedIn: 'root'
})
export class ResourceByPhasesService {

  private readonly API = `${environment.API}/resource_by_phases`;
  
  emitResourceByPhaseAdd = new EventEmitter<any>();
  emitResourceByPhaseUpdate = new EventEmitter<any>();
  emitResourceByPhaseDelete = new EventEmitter<any>();
  
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

  getResourcesByProjectId(id_project: number) {
    return this.http.get<TestUser[]>(`${this.API}/${id_project}/by_project/`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getResourcesByProjectDataProjectByResource(id_project: number, id_person: number) {
    return this.http.get<TestUser[]>(`${this.API}/${id_project}/${id_person}/data_project_by_resource/`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getResourceByPhasesAll() {
    return this.http.get<ResourceByPhase[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getResourceByPhaseId(id_project: number) {
    return this.http.get<ResourceByPhase[]>(`${this.API}/${id_project}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addResourceByPhase(resource_by_phase: ResourceByPhase) {
    return this.http.post<ResourceByPhase>(this.API, { resource_by_phase: resource_by_phase }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitResourceByPhaseAdd.emit(data);
        })
      );
  }

  updateResourceByPhase(resource_by_phase: ResourceByPhase, id: number) {
    return this.http.put<ResourceByPhase>(`${this.API}/${id}`, resource_by_phase, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitResourceByPhaseUpdate.emit(data);
        })
      );
  }

  deleteResourceByPhase(id: number) {
    return this.http.delete<ResourceByPhase>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitResourceByPhaseDelete.emit(data);
        })
      );
  }
}