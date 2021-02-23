import { TableData } from 'src/app/models/table-data';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VicePresidency } from '../models/vice-presidency';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VicePresidenciesService {

  private readonly API = `${environment.API}/vice_presidencies`;

  emitModify = new EventEmitter<any>();
  emitDelete = new EventEmitter<any>();
  emitAdd = new EventEmitter<any>();

  inputParams: any = {
    user_id: localStorage.id
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

  getVicePresidenciesAll() {

    return this.http.get<TableData[]>(`${this.API}/list`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getVicePresidenciesId(id: number) {

    return this.http.get<VicePresidency>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  // addVicePresidencies(vicePresidency: VicePresidency) {

  //   return this.http.post<VicePresidency>(this.API, vicePresidency, this.httpOptions)
  //   .subscribe((data: VicePresidency) => {
  //     this.emitAdd.emit(data);
  //   });
  // }

  // deleteVicePresidenciesId(id: number) {

  //   return this.http.delete<VicePresidency>(`${this.API}/${id}`, this.httpOptions)
  //   .subscribe((data: VicePresidency) => {
  //     this.emitDelete.emit(data);
  //   });
  // }

  // updateVicePresidenciesId(vicePresidency: VicePresidency, id: number) {

  //   return this.http.put<VicePresidency>(`${this.API}/${id}`, vicePresidency, this.httpOptions)
  //     .subscribe((data: VicePresidency) => {
  //       this.emitModify.emit(data);
  //     });
  // }

}
