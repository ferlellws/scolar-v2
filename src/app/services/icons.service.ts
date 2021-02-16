import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Icon } from '../models/icon';

@Injectable({
  providedIn: 'root'
})
export class IconsService {

  private readonly API = `${environment.API}/icons`;

  constructor(private http: HttpClient) { }

  getIcons() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Icon[]>(this.API, httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
      // return this._projects;
  }

}
