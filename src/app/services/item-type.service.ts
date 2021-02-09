import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItemType } from '../models/item-type';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  itemType: ItemType;  

  private readonly API = `${environment.API}/item_types`;


  constructor(private http: HttpClient) { }

  getItemTypes() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ItemType[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getItemType(id: string) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ItemType>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    )
  }

}
