import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly API = `${environment.API}/projects`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getProjectsAll() {
    var inputParams: any = {
     // user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Project[]>(`${this.API}/list`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProjectsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<Project>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addProjects(project: Project) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<Project>(this.API, project, httpOptions)
    .subscribe((data: Project) => {
      this.emitAdd.emit(data);
    });
  }

  deleteProjectsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<Project>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: Project) => {
      this.emitDelete.emit(data);
    });
  }

  updateProjectsId(project: Project, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<Project>(`${this.API}/${id}`, project, httpOptions)
      .subscribe((data: Project) => {
        this.emitModify.emit(data);
      });
  }

}
