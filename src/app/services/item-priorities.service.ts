import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemPriority } from '../models/item-priority';

@Injectable({
  providedIn: 'root'
})
export class ItemPrioritiesService {

  private readonly API = `${environment.API}/item_priorities`;

  constructor(private http: HttpClient) { }

  getItemPriorities() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ItemPriority[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

}
