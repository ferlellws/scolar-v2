import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemResolution } from '../models/item-resolution';

@Injectable({
  providedIn: 'root'
})

export class ItemResolutionsService {

  private readonly API = `${environment.API}/item_resolutions`;

  constructor(private http: HttpClient) { }

  getItemResolutions() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ItemResolution[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

}
