import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MainTableProject } from '../models/main-table-project';

@Injectable({
  providedIn: 'root'
})
export class MainCreateTablesService {

  private readonly API = `${environment.API}/main_create_tables`;

  httpOptions!: any;

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  constructor(private http: HttpClient
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bareer ${localStorage.token}`
        }),
        params: this.inputParams
      };
  }

  addMainTableProject(main_tables: MainTableProject) {
    return this.http.post<MainTableProject>(`${this.API}/create_data_projects`, { main_tables: main_tables }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

}
