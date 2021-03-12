import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Benefit } from '../models/benefit';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  private readonly API = `${environment.API}/benefits`;

  emitBenefits = new EventEmitter<any>();
  emitDeleteBenefits = new EventEmitter<any>();

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

  getBenefits() {
    return this.http.get<Benefit[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getBenefitById(id: number) {
    return this.http.get<Benefit>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getBenefitByProjectId(id: number) {
    this.getBenefits().subscribe( (data: Benefit[]) => {
      return data.filter(benefit => benefit.project!.id == id);
    })
  }

  addBenefit(benefit: Benefit) {
    return this.http.post<Benefit>(this.API, { benefit: benefit }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitBenefits.emit(data);
        })
      );
  }

  updateBenefitsId(benefit: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, benefit, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitBenefits.emit(data);
        })
      );
  }


  logicalDeleteBenefit(id: number) {

    return this.http.put<Benefit>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteBenefits.emit(data);
        })
      );
  }

  deleteBenefit(id: number) {
    return this.http.delete<Benefit>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteBenefits.emit(data);
        })
      );
  }

}
