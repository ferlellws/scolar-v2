import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ItemTime } from 'src/app/models/item-time';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemTimesService {

  private readonly API = `${environment.API}/item_record_times`;

  emitAddItemTime = new EventEmitter<any>();
  emitDeleteItemTime = new EventEmitter<any>();
  emitEditItemTime = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getTimes(){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.get<ItemTime[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    )
  }

  getTimesByItem(id: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    return this.http.get<ItemTime[]>(`${this.API}/by_item/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    )
  }

  getTimesByItemUser(idItem: number, idUser: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    
    return this.http.get<ItemTime[]>(`${this.API}/by_item_user/${idItem}/${idUser}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    )
  }

  addTime(time : any){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.post<ItemTime>(this.API, time, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).subscribe((data: ItemTime) => {
      this.emitAddItemTime.emit(data);
    });;
  }

  updateTime(time: any, id: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.put<ItemTime>(`${this.API}/${id}`, time, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).subscribe((data: ItemTime) => {
      this.emitEditItemTime.emit(data);
    });;
  }

  deleteTime(id: number){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.delete<ItemTime>(`${this.API}/${id}`, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    ).subscribe((data: ItemTime) => {
      this.emitDeleteItemTime.emit(data);
    });;
  }

}
