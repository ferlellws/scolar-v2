import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardProjectsResolver implements Resolve<boolean> {
  
  constructor(
    private vicepresidenciesService: VicePresidenciesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any[]> |Promise<any>|any{
      return this.vicepresidenciesService.getProjectsDashboard();
  }
}
