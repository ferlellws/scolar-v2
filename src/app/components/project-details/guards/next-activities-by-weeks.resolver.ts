import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NextActivitiesService } from 'src/app/services/next-activities.service';

@Injectable({
  providedIn: 'root'
})
export class NextActivitiesByWeeksResolver implements Resolve<boolean> {
  constructor(
    private nextActivitiesService: NextActivitiesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.nextActivitiesService.getNextActivitiesByProjectsSpecificData(route.params.id);
  }
}
