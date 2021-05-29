import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AreaByProject } from '../models/area-by-project';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AreasByProjectService {

  private readonly API = `${environment.API}/areas_by_projects`;


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

  getAreaByProjects() {
    return this.http.get<AreaByProject[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getAreaByProjectsFilterProjectSpecificData(id: number) {
    return this.http.get<AreaByProject[]>(`${this.API}/${id}/filter_project_specific_data`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getAreaByProjectById(id: number) {
    return this.http.get<AreaByProject>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getAreaByProjectByProjectId(id: number) {
    this.getAreaByProjects().subscribe( (data: AreaByProject[]) => {
      return data.filter(application_by_project => application_by_project.project!.id == id);
    })
  }

  addAreaByProject(areas_by_project: AreaByProject) {
    return this.http.post<AreaByProject>(this.API, { areas_by_project: areas_by_project }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateAreaByProjectsId(application_by_project: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, application_by_project, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


  logicalDeleteAreaByProject(id: number) {

    return this.http.put<AreaByProject>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteAreaByProject(id: number) {
    return this.http.delete<AreaByProject>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

}
