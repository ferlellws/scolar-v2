import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TypeDependency } from '../models/type-dependency';

@Injectable({
  providedIn: 'root'
})
export class TypesDependenciesService {

  private readonly API = `${environment.API}/type_dependency`;
  
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
    return this.http.get<TypeDependency[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getImpactId(id: number) {
    return this.http.get<TypeDependency>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  addImpact(type_dependency: TypeDependency) {
    return this.http.post<TypeDependency>(this.API, { type_dependency: type_dependency }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  updateImpact(type_dependency: TypeDependency, id: number) {
    return this.http.post<TypeDependency>(`${this.API}/${id}`, type_dependency, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  deleteImpact(id: number) {
    return this.http.delete<TypeDependency>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }
}
