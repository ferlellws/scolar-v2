import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Highlight } from '../models/highlight';

@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  emitHighlights = new EventEmitter<any>();
  emitDeleteHighlights = new EventEmitter<any>();

  private readonly API = `${environment.API}/highlights`;

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

  getHighlights() {
    return this.http.get<Highlight[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getHighlightsByProjectSpecificData(id: number) {
    return this.http.get<Highlight[]>(`${this.API}/${id}/by_project_specific_data`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getHighlightById(id: number) {
    return this.http.get<Highlight>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getHighlightByProjectId(id: number) {
    this.getHighlights().subscribe( (data: Highlight[]) => {
      return data.filter(highlight => highlight.project!.id == id);
    })
  }

  addHighlight(highlight: Highlight) {
    return this.http.post<Highlight>(this.API, { highlight: highlight }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitHighlights.emit(data);
        })
      );
  }

  updateHighlightId(highlight: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, highlight, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitHighlights.emit(data);
        })
      );
  }


  logicalDeleteHighlight(id: number) {

    return this.http.put<Highlight>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteHighlights.emit(data);
        })
      );
  }

  deleteHighlight(id: number) {
    return this.http.delete<Highlight>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDeleteHighlights.emit(data);
        })
      );
  }
}
