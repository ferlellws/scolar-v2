import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private readonly API = `${environment.API}/items`;

  emitModifyItem = new EventEmitter<any>();
  emitDeleteItem = new EventEmitter<any>();
  emitAddItem = new EventEmitter<any>();
  emitCreateFormTemp = new EventEmitter<any>();

  private _items: Item[] = [];

  private _itemsProject: any[];


  constructor(private http: HttpClient) { }

  getItems() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Item[]>(`${this.API}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }
  getItemsReport() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params:{
        sysuser_id: sessionStorage.id,
      }
    };

    return this.http.get<Item[]>(`${this.API}_report`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getItemsByProjectId(id: string, developer_company_id?: number) {
    let urlItems = `${this.API}/project_items/${id}`;

    if (developer_company_id != null) {
      urlItems += `?developer_company_id=${developer_company_id}`;
    }
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<Item[]>(urlItems, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addItem(item: any) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    item.sysuser_id = sessionStorage.id;
    return this.http.post<Item>(this.API, item, httpOptions)
    .subscribe((data: Item) => {
      this.emitAddItem.emit(data);
    });
  }

  createFromTemporal(item: any, id:number) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.post<Item>(`${this.API}/create_from_temporal/${id}`, item, httpOptions)
    .subscribe((data: Item) => {
      this.emitCreateFormTemp.emit(data);
      this.emitAddItem.emit(data);
    });
  }

  modifyItem(id:string, item:any) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    item.sysuser_id = sessionStorage.id;
    return this.http.put<Item>(`${this.API}/${id}`, item, httpOptions)
    .subscribe((data: Item) => {
      this.emitModifyItem.emit(data);
    });
  }

  deleteItem(id: string) {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    this.http.delete(`${this.API}/${id}`, httpOptions)
    .pipe(
      catchError(this.handleError)
    ).subscribe( (res) => {
      this.emitDeleteItem.emit(200);
    },
    (err) => {
      this.emitDeleteItem.emit(409);
    });


  }

  mandarAlerta(status: number){
    this.emitDeleteItem.emit(status);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
