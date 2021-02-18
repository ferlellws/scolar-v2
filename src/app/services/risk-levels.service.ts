import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RiskLevel } from '../models/risk-level';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiskLevelsService {

  private readonly API = `${environment.API}/risk_levels`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();
  
  constructor(private http: HttpClient) { }

  getRiskLevelsAll() {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<RiskLevel[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getRiskLevelsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.get<RiskLevel>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addRiskLevels(riskLevel: RiskLevel) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.post<RiskLevel>(this.API, riskLevel, httpOptions)
    .subscribe((data: RiskLevel) => {
      this.emitAdd.emit(data);
    });
  }

  deleteRiskLevelsId(id: number) {
    var inputParams: any = {user_id: localStorage.id};

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.delete<RiskLevel>(`${this.API}/${id}`, httpOptions)
    .subscribe((data: RiskLevel) => {
      this.emitDelete.emit(data);
    });
  }

  updateRiskLevelsId(riskLevel: RiskLevel, id: number) {
    var inputParams: any = {
      //user_id: localStorage.id
    };

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: inputParams
    };

    return this.http.put<RiskLevel>(`${this.API}/${id}`, riskLevel, httpOptions)
      .subscribe((data: RiskLevel) => {
        this.emitModify.emit(data);
      });
  }

}
