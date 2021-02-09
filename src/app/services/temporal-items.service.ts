import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TemporalItem } from '../models/temporal-item';

@Injectable({
  providedIn: 'root'
})
export class TemporalItemsService {

  private readonly API = `${environment.API}/temporal_items`;

  emitDeleteTemporalItem = new EventEmitter<any>();
  emitAddTemporalItem = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getTemporalItemsByProjectId(id:string) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<TemporalItem[]>(`${this.API}/project_items/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addTemporalItem(temporalItem: any) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.post<TemporalItem>(this.API, temporalItem, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      ).subscribe((data: TemporalItem) =>
        {
          this.emitAddTemporalItem.emit(data);
        }
      );
  }

  deleteTemporalItem(id: string) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.delete(`${this.API}/${id}`, httpOptions)
    .pipe(
      tap(console.log)
    ).subscribe(data =>
      this.emitDeleteTemporalItem.emit(data)
    );
  }

}
