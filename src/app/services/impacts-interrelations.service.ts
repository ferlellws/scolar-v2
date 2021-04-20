import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ImpactInterrelation } from '../models/impact-interrelation';

@Injectable({
  providedIn: 'root'
})
export class ImpactsInterrelationsService {
  
  private readonly API = `${environment.API}/impacts_interrelations`;
  
  emitNew = new EventEmitter<any>();
  
  httpOptions!: any;
  
  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };
  };
  
  getImpactsAll() {
    return this.http.get<ImpactInterrelation[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getImpactId(id: number) {
    return this.http.get<ImpactInterrelation>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  addImpact(impact: ImpactInterrelation) {
    return this.http.post<ImpactInterrelation>(this.API, { impact: impact }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  updateImpact(impact: ImpactInterrelation, id: number) {
    return this.http.post<ImpactInterrelation>(`${this.API}/${id}`, impact, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  deleteImpact(id: number) {
    return this.http.delete<ImpactInterrelation>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

}
