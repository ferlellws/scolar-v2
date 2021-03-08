import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectsService } from 'src/app/services/projects.service';
import { TestUsersService } from 'src/app/services/test-users.service';

@Injectable({
  providedIn: 'root'
})
export class TestUsersByProjectsResolver implements Resolve<boolean> {
  constructor(
    private testUsersService: TestUsersService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.testUsersService.getTestUsers();
      //return this.testUsersService.getTestUserByProjectId(route.params.id);
  }
}
