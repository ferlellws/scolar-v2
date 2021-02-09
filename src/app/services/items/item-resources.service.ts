import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ItemResource } from 'src/app/models/item-resource';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemResourcesService {

  private readonly API = `${environment.API}/item_resources`;

  emitAddResource = new EventEmitter<any>();
  emitDeleteResource = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getResourcesByItem(id: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.get<ItemResource[]>(`${this.API}/by_item/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    )
  }

  addResource(resource: any){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.post<ItemResource>(this.API, resource, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).subscribe((data: ItemResource) => {
      this.emitAddResource.emit(data);
    });;
  }

  deleteResource(id: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.delete<ItemResource>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).subscribe((data: ItemResource) => {
      this.emitDeleteResource.emit(data);
    });;
  }

}
