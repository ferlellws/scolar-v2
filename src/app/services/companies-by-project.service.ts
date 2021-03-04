import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CompanyByProject } from '../models/company-by-project';

@Injectable({
  providedIn: 'root'
})
export class CompaniesByProjectService {

  private readonly API = `${environment.API}/companies_by_projects`;


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

  getCompanyByProjects() {
    return this.http.get<CompanyByProject[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getCompanyByProjectById(id: number) {
    return this.http.get<CompanyByProject>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getCompanyByProjectByProjectId(id: number) {
    this.getCompanyByProjects().subscribe( (data: CompanyByProject[]) => {
      return data.filter(company_by_project => company_by_project.project!.id == id);
    })
  }

  addCompanyByProject(companies_by_project: CompanyByProject) {
    return this.http.post<CompanyByProject>(this.API, { companies_by_project: companies_by_project }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateCompanyByProjectsId(company_by_project: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, company_by_project, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


  logicalDeleteCompanyByProject(id: number) {

    return this.http.put<CompanyByProject>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteCompanyByProject(id: number) {
    return this.http.delete<CompanyByProject>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


}
