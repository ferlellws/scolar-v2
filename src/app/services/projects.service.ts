import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';
import { tap } from 'rxjs/operators';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private readonly API = `${environment.API}/projects`;

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

  getProjectsAll(own: number) {
    this.httpOptions.params.own = own;
    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProjectsSelect() {
    return this.http.get<Project[]>(`${this.API}/select`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProjectsId(id: number) {
    return this.http.get<Project>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getYearsStartDate(){
    return this.http.get<Project[]>(`${this.API}/years_start_date`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDedicationResoruces(id: number) {
    return this.http.get<Project[]>(`${this.API}/${id}/dedication_resources`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  updateProjectsId(project: Project, id: number) {
    return this.http.put<Project>(`${this.API}/${id}`, project, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  addProjects(project: Project) {
    return this.http.post<Project>(this.API, { project: project }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusProject(is_active: number, id: number) {
    return this.http.put<Project>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  logicalDeleteProject(id: number) {
    return this.http.put<Project>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deleteProjectsId(id: number) {
    return this.http.delete<Project>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  downloadExcel(own: boolean, name: string) {

    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };
    
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };

    if (own) {
      this.httpOptions.params.own = own;
    }

    this.httpOptions.responseType = 'blob' as 'json'

    return this.http.get(`${this.API}/download_report`, this.httpOptions)
      .subscribe(
        (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', "Reporte "+ name + new Date());
          document.body.appendChild(downloadLink);
          downloadLink.click();
        })
  }
}
