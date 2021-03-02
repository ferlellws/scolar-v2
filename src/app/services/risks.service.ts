import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Risk } from '../models/risk';

@Injectable({
  providedIn: 'root'
})
export class RisksService {

  private readonly API = `${environment.API}/risks`;

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

  getRisks() {
    return this.http.get<Risk[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getRiskById(id: number) {
    return this.http.get<Risk>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getRiskByProjectId(id: number) {
    this.getRisks().subscribe( (data: Risk[]) => {
      return data.filter(highlight => highlight.project!.id == id);
    })
  }

  addRisk(risk: Risk) {
    return this.http.post<Risk>(this.API, { risk: risk }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateRiskId(risk: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, risk, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


  logicalDeleteRisk(id: number) {

    return this.http.put<Risk>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteRisk(id: number) {
    return this.http.delete<Risk>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
