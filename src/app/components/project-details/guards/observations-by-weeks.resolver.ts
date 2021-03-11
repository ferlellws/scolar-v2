import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { NextActivitiesService } from 'src/app/services/next-activities.service';
import { ObservationsService } from 'src/app/services/observations.service';

@Injectable({
  providedIn: 'root'
})
export class ObseravtionsByWeeksResolver implements Resolve<boolean> {
  constructor(
    private observationsService: ObservationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.observationsService.getObservationsAll();
      //return this.observationsService.getWeeksByProjects(route.params.id);
  }
}
