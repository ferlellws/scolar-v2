import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TimeType } from '../models/time-type';

@Injectable({
  providedIn: 'root'
})
export class TimeTypesService {

  private readonly API = `${environment.API}/time_types`;


  constructor(private http: HttpClient) { }

  getTimeTypes(){

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };
    
    return this.http.get<TimeType[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

}
