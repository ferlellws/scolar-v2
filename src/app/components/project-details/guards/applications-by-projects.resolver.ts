import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApplicationsByProjectService } from 'src/app/services/applications-by-project.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsByProjectsResolver implements Resolve<boolean> {
  constructor(
    private applicationsByProjectsService: ApplicationsByProjectService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      return this.applicationsByProjectsService.getApplicationByProjectsFilterProjectSpecificData(route.params.id);
    }
}
