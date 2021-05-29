import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WeeksService } from 'src/app/services/weeks.service';

@Injectable({
  providedIn: 'root'
})
export class WeeksByProjectsResolver implements Resolve<boolean> {
  constructor(
    private weeksService: WeeksService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.weeksService.getWeeksByProjectsSpecificData(route.params.id);
  }
}
