import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TestUser } from '../models/test-user';

@Injectable({
  providedIn: 'root'
})
export class TestUsersService {

  private readonly API = `${environment.API}/test_users`;


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

  getTestUsers() {
    return this.http.get<TestUser[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getTestUserById(id: number) {
    return this.http.get<TestUser>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getTestUserByProjectId(id: number) {
    this.getTestUsers().subscribe( (data: TestUser[]) => {
      return data.filter(test_user => test_user.project!.id == id);
    })
  }

  addTestUser(test_user: TestUser) {
    return this.http.post<TestUser>(this.API, { test_user: test_user }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateTestUsersId(test_user: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, test_user, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


  logicalDeleteTestUser(id: number) {

    return this.http.put<TestUser>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteTestUser(id: number) {
    return this.http.delete<TestUser>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }


}
