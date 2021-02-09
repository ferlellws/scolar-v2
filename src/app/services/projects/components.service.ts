import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ComponentModel } from 'src/app/models/component-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ComponentsService {

  private readonly API = `${environment.API}/components`;

  constructor(private http: HttpClient) { }

  getComponents() {

    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      })
    };

    return this.http.get<ComponentModel[]>(this.API, httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
    // return this._projects;
  }

}
