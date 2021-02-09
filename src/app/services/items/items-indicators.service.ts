import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsIndicatorsService {

  private readonly API = `${environment.API}/items_indicators`;

  constructor(private http: HttpClient) { }

  getItemsIndicators(id: number){

      var inputParams: any = {
        sysuser_id: sessionStorage.id,
        format: 'json',
        project_id: id,
      }

      let httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bareer ${sessionStorage.token}`
        }),
        params: inputParams,
      }
      return this.http.get<any[]>(`${this.API}`, httpOptions)
        .pipe(tap(console.log));

  }

}
