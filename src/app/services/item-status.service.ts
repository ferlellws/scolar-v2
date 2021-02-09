import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemStatus } from '../models/item-status';

@Injectable({
  providedIn: 'root'
})
export class ItemStatusService {



  private readonly API = `${environment.API}/item_statuses`;

  constructor(private http: HttpClient) { }

  getItemStatus(projectId?: number) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    let url: string = this.API;
    if (projectId) {
      url += `?project_id=${projectId}`;
    }

    return this.http.get<ItemStatus[]>(url, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

}
