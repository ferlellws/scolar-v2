import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MenuModule } from '../models/menu-module';

@Injectable({
  providedIn: 'root'
})
export class MenuModulesService {

  private readonly API = `${environment.API}/menu_modules`;

  emitDataTable = new EventEmitter<any>();

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  httpOptions!: any;

  constructor(
    private http: HttpClient
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };
  }

  changeOrdering(menuModules: MenuModule[]) {
    return this.http.put<MenuModule[]>(`${this.API}/update_ordering/`, { menu_modules: menuModules }, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }
}
