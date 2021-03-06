import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Kpi } from '../models/kpi';

@Injectable({
  providedIn: 'root'
})
export class KpisService {

  emitKpis = new EventEmitter<any>();
  emitDeleteKpis = new EventEmitter<any>();

  private readonly API = `${environment.API}/kpis`;

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

  getKpis() {
    return this.http.get<Kpi[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getKpisByProjectSpecificData(id: number) {
    return this.http.get<Kpi[]>(`${this.API}/${id}/by_project_specific_data`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getKpiById(id: number) {
    return this.http.get<Kpi>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getKpiByProjectId(id: number) {
    this.getKpis().subscribe( (data: Kpi[]) => {
      return data.filter(highlight => highlight.project!.id == id);
    })
  }

  addKpi(kpi: Kpi) {
    return this.http.post<Kpi>(this.API, { kpi: kpi }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitKpis.emit(data);
        })
      );
  }

  updateKpiId(risk: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, risk, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitKpis.emit(data);
        })
      );
  }


  logicalDeleteKpi(id: number) {

    return this.http.put<Kpi>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteKpis.emit(data);
        })
      );
  }

  deleteKpi(id: number) {
    return this.http.delete<Kpi>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteKpis.emit(data);
        })
      );
  }
}
