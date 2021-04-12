import { StrategicGuidelines } from './../models/strategic-guidelines';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProjectProgressReport } from '../models/project-progress-report';

export interface DataInitial {
  externalCompanyStates: any;
  externalCompanySchedules: any;
  strategicGuidelines: StrategicGuidelines[]
}

@Injectable({
  providedIn: 'root'
})
export class ProjectProgressReportService {

  private readonly API = `${environment.API}/external_company_tracings`;

  emitDataTable = new EventEmitter<any>();

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  httpOptions!: any;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };
  }

  getDataInitial() {
    return this.http.get<DataInitial[]>(`${this.API}/data_initial`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getDataProjectProgressReport(strategicGuidelineId: number) {
    return this.http.get<ProjectProgressReport[]>(`${this.API}/chart_project_progress_report/${strategicGuidelineId}`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getDataProjectProgressReportByProjectId(strategicGuidelineId: number) {
    return this.http.get<ProjectProgressReport[]>(`${this.API}/chart_project_progress_report/${strategicGuidelineId}`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getDeliveryStatuses() {
    return this.http.get<any[]>(`${this.API}/delivery_statuses`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  // getProjectsSelect() {
  //   return this.http.get<Project[]>(`${this.API}/select`, this.httpOptions)
  //   .pipe(
  //     // catchError(this.handleError)
  //     tap(console.log)
  //   );
  // }

  // getProjectsId(id: number) {
  //   return this.http.get<Project>(`${this.API}/${id}`, this.httpOptions)
  //   .pipe(
  //     // catchError(this.handleError)
  //     tap((data: any) => {
  //       // this.emitDataTable.emit(data);
  //     })
  //   );
  // }

  // addProjects(project: Project) {

  //   return this.http.post<Project>(this.API, { project: project }, this.httpOptions)
  //     .pipe(
  //       tap((data: any) => {
  //         this.emitDataTable.emit(data);
  //       })
  //     );
  // }

  // updateProjectsId(project: Project, id: number) {
  //   return this.http.put<Project>(`${this.API}/${id}`, project, this.httpOptions)
  //     .pipe(
  //       tap((data: any) => {
  //         this.emitDataTable.emit(data);
  //       })
  //     );
  // }

  // updateStatusProject(is_active: number, id: number) {

  //   return this.http.put<Project>(`${this.API}/${id}/change_status`,
  //     {is_active: is_active},
  //     this.httpOptions)
  //     .pipe(
  //       tap((data: any) => {
  //         this.emitDataTable.emit(data);
  //       })
  //     );
  // }

  // logicalDeleteProject(id: number) {

  //   return this.http.put<Project>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
  //     .pipe(
  //       tap((data: any) => {
  //         this.emitDataTable.emit(data);
  //       })
  //     );
  // }

  // deleteProjectsId(id: number) {
  //   return this.http.delete<Project>(`${this.API}/${id}`, this.httpOptions)
  //     .pipe(
  //       tap((data: any) => {
  //         this.emitDataTable.emit(data);
  //       })
  //     );
  // }

}
