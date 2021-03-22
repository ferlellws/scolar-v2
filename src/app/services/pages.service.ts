import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// SERVICES
import { Page } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private readonly API = `${environment.API}/pages`;

  emitDataTable = new EventEmitter<any>();

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

  getPagesWithoutModule() {
    return this.http.get<Page[]>(`${this.API}/without_modules`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }
}
