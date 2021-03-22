import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsDashboardOwnResolver implements Resolve<boolean> {

  constructor(
    private vicepresidenciesService: VicePresidenciesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.vicepresidenciesService.getProjectsDashboard(true);
  }
}
