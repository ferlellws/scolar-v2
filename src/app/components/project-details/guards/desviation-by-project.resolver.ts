import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DesviationCausesService } from 'src/app/services/desviation-causes.service';

@Injectable({
  providedIn: 'root'
})
export class DesviationByProjectResolver implements Resolve<boolean> {
  constructor(
    private _desviationCausesService: DesviationCausesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._desviationCausesService.getDesviationCausesByProject(route.params.id);
  }
}
