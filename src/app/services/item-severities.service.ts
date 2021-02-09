import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemSeverity } from '../models/item-severity';

@Injectable({
  providedIn: 'root'
})
export class ItemSeveritiesService {

  private readonly API = `${environment.API}/item_severities`;

  constructor(private http: HttpClient) { }

  getItemSeverities() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ItemSeverity[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

  // getItemSeveritiesByTemplate(idTemplate: number) {

  //   var httpOptions = {
  //     headers: new HttpHeaders({
  //       Authorization: `Bareer ${sessionStorage.token}`
  //     })
  //   };

  //   return this.http.get<ItemSeverity[]>(this.API, httpOptions)
  //     .pipe(
  //       // catchError(this.handleError)
  //       tap(itemStatus => itemStatus.filter(itemStatusObject => itemStatusObject.template_id == idTemplate))
  //     );
  //   // return this._projects;
  // }

}
