import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private readonly API = `${environment.API}/people`;

  emitDataTable = new EventEmitter<any>();

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  httpOptions = {};

  constructor(private http: HttpClient) {

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${sessionStorage.token}`
      }),
      params: this.inputParams
    };
  }

  getPersons() {
    return this.http.get<Person[]>(this.API, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getPeopleSelect() {
    return this.http.get<Person[]>(`${this.API}/all_people_select`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getPeopleCount() {
    return this.http.get<number>(`${this.API}/count_people`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getTablaPeople(page: number, per_page: number) {
    this.inputParams.page = page;
    this.inputParams.per_page = per_page;

    return this.http.get<Person[]>(`${this.API}/index_with_data_table`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getPersonsId(id: number) {
    return this.http.get<Person>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getPersonByUser(id: number) {
    return this.http.get<Person[]>(`${this.API}/person_by_user/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  addPerson(person: any) {
    return this.http.post<Person>(`${this.API}`, { person: person }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updatePerson(person: Person, id: number) {
    return this.http.put<Person>(`${this.API}/${id}`, person, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  updateStatusPerson(is_active: number, id: number) {
    return this.http.put<Person>(`${this.API}/${id}/change_status`,
      {is_active: is_active},
      this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  deletePerson(id: number) {
    return this.http.delete<Person>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitDataTable.emit(data);
        })
      );
  }

  getManagers() {
    return this.http.get<Person[]>(`${this.API}/managers`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getManagersSelect() {
    return this.http.get<Person[]>(`${this.API}/managers_select`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getFunctionalLeaders() {
    return this.http.get<Person[]>(`${this.API}/functional_leaders`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getFunctionalLeadersSelect() {
    return this.http.get<Person[]>(`${this.API}/functional_leaders_select`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }
  
  getFunctionalResources() {
    return this.http.get<Person[]>(`${this.API}/functional_resources`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getWithoutAccess() {
    return this.http.get<Person[]>(`${this.API}/without_access`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

  getWithoutAccessSelect() {
    return this.http.get<Person[]>(`${this.API}/without_access_select`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap(console.log)
      );
  }

}
