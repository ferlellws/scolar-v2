import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeCapacityService {

  private readonly API = `${environment.API}/special_reports`;


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

  getTimeLineResourcesCapacity(page: any, per_page: any, vice_presidency_id: any, area_id: any, project_id: any, person_id: any, start_date: any, end_date: any) {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions.params = this.inputParams;

    if(page != "" && per_page != "") {
      this.inputParams.page = page;
      this.inputParams.per_page = per_page;
    }

    if(vice_presidency_id != "") {
      this.inputParams.vice_presidency_id = vice_presidency_id;
    }
    if(area_id != "") {
      this.inputParams.area_id = area_id;
    }
    if(project_id != ""){
      this.inputParams.project_id = project_id;
    }
    if(person_id != ""){
      this.inputParams.person_id = person_id;
    }
    if(start_date != ""){
      this.inputParams.start_date = start_date;
    }
    if(end_date != ""){
      this.inputParams.end_date = end_date;
    }

    return this.http.get<any[]>(`${this.API}/timeline_resources_capacity`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getDatResourcesOutArea(page: any, per_page: any, vice_presidency_id: any, area_id: any, project_id: any) {
    this.inputParams = {
      user_email: JSON.parse(localStorage.user).email,
      user_token: JSON.parse(localStorage.user).authentication_token
    };

    this.httpOptions.params = this.inputParams;

    if(page != "" && per_page != "") {
      this.inputParams.page = page;
      this.inputParams.per_page = per_page;
    }

    if(vice_presidency_id != "") {
      this.inputParams.vice_presidency_id = vice_presidency_id;
    }
    if(area_id != "") {
      this.inputParams.area_id = area_id;
    }
    if(project_id != ""){
      this.inputParams.project_id = project_id;
    }

    return this.http.get<any[]>(`${this.API}/data_resources_out_area`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );    
  }

}
