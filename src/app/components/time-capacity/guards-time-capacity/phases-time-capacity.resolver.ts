import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PhasesService } from 'src/app/services/phases.service';

@Injectable({
  providedIn: 'root'
})
export class PhasesTimeCapacityResolver implements Resolve<boolean> {
  constructor(
    private phasesService: PhasesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.phasesService.getPhaseColor();
  }
}
