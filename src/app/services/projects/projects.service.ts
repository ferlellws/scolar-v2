import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Project } from 'src/app/models/project';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly API = `${environment.API}/projects`;

  emitProjects = new EventEmitter<any>();
  emitProject = new EventEmitter<any>();

  private _projects: Project[] = [];
  project: Project;

  constructor(private http: HttpClient) { }

  getProjects() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Project[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

  getItemsProject(project_id: number = null, developer_company_id?: number) {
    // var inputParams: any = {
    //   sysuser_id: sessionStorage.id,
    //   format: 'json',
    //   complete_item: 0,
    // }

    var inputParams: any = {
      sysuser_id: sessionStorage.id,
      format: 'json',
      complete_item: 0,
    }

    if (project_id != null) {
      inputParams.project_id = project_id;
      inputParams.complete_item = 1;
      if (developer_company_id != null) {
        inputParams.developer_company_id = developer_company_id;
      }
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Project[]>(`${environment.API}/projects_indicators`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

  getDeveloperCompanyItemsProject(project_id: number = null) {
    // var inputParams: any = {
    //   sysuser_id: sessionStorage.id,
    //   format: 'json',
    //   complete_item: 0,
    // }

    var inputParams: any = {
      sysuser_id: 1,
      format: 'json',
      complete_item: 0,
    }

    if (project_id != null){
      inputParams.project_id = project_id;
      inputParams.complete_item = 1;
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Project[]>(`${environment.API}/developers_companies_indicators`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

  getProject(id: number) {
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Project>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(project => this.project = project)
    );
  }

  addProject(project:any) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.post<Project>(this.API, project, httpOptions)
    .subscribe((data: Project) => {
      this.emitProject.emit(data);
    });
  }

  modifyProject(id:string, project:any) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.put<Project>(this.API+ '/' + id, project, httpOptions)
    .subscribe((data: Project) => {
      this.emitProject.emit(data);
    });
  }


  deleteProject(id: string) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.delete(this.API + '/' + id, httpOptions)
    .subscribe((data: Project[]) => {
      this._projects = data;
      this.emitProjects.emit(this._projects);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
