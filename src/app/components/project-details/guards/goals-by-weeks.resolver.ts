import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GoalsService } from 'src/app/services/goals.service';

@Injectable({
  providedIn: 'root'
})
export class GoalsByWeeksResolver implements Resolve<boolean> {
  constructor(
    private goalsService: GoalsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> |Promise<any>|any{
      console.log(route.params.id);
      return this.goalsService.getGoalsByProjectSpecificData(route.params.id);
  }
}
