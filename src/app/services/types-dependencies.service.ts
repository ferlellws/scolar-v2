import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TypeDependency } from '../models/type-dependency';

@Injectable({
  providedIn: 'root'
})
export class TypesDependenciesService {

  private readonly API = `${environment.API}/types_dependencies`;
  
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
  
  getTypeDependencyAll() {
    return this.http.get<TypeDependency[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTypeDependencyId(id: number) {
    return this.http.get<TypeDependency>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  addTypeDependency(type_dependency: TypeDependency) {
    return this.http.post<TypeDependency>(this.API, { type_dependency: type_dependency }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  updateTypeDependency(type_dependency: TypeDependency, id: number) {
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
