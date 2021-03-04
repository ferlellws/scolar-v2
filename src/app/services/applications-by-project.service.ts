import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationByProject } from '../models/application-by-project';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsByProjectService {

  private readonly API = `${environment.API}/applications_by_projects`;


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

  getApplicationByProjects() {
    return this.http.get<ApplicationByProject[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getApplicationByProjectById(id: number) {
    return this.http.get<ApplicationByProject>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getApplicationByProjectByProjectId(id: number) {
    this.getApplicationByProjects().subscribe( (data: ApplicationByProject[]) => {
      return data.filter(application_by_project => application_by_project.project!.id == id);
    })
  }

  addApplicationByProject(applications_by_project: ApplicationByProject) {
    return this.http.post<ApplicationByProject>(this.API, { applications_by_project: applications_by_project }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateApplicationByProjectsId(application_by_project: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, application_by_project, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


  logicalDeleteApplicationByProject(id: number) {

    return this.http.put<ApplicationByProject>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteApplicationByProject(id: number) {
    return this.http.delete<ApplicationByProject>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

}
