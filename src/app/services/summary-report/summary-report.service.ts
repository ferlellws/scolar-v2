import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// MODELS
import { SummaryReport } from 'src/app/models/summary-report';

@Injectable({
  providedIn: 'root'
})
export class SummaryReportService {

  private readonly API = `${environment.API}`;
  private _summaryReport: SummaryReport;

  constructor(private http: HttpClient) { }

  getSummaryReport() {

    var inputParams: any = {
      sysuser_id: sessionStorage.id,
      // developer_company_id: 2
      // format: 'json',
      // complete_item: 0,
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<any[]>(`${this.API}/indicators_graphs`, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
      // return this._projects;
  }

  getManagementOpportunityGraph() {
    var inputParams: any = {
      sysuser_id: sessionStorage.id,
      // developer_company_id: 2
      // format: 'json',
      // complete_item: 0,
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<any[]>(`${this.API}/management_opportunity_graphs`, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
      // return this._projects;
  }

  getProjectsSummaryGraphs() {
    var inputParams: any = {
      sysuser_id: sessionStorage.id,
      // developer_company_id: 2
      // format: 'json',
      // complete_item: 0,
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<any[]>(`${this.API}/projects_summary_graphs`, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
      // return this._projects;
  }

  getDeliveryOpportunityIndicators() {
    var inputParams: any = {
      sysuser_id: sessionStorage.id,
      // developer_company_id: 2
      // format: 'json',
      // complete_item: 0,
    }

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<any[]>(`${this.API}/delivery_oportunity_indicators`, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
      // return this._projects;
  }
}
