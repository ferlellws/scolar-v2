import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AreasService } from 'src/app/services/areas.service';

@Injectable({
  providedIn: 'root'
})
export class AreasTimeCapacityResolver implements Resolve<boolean> {
  constructor(
    private areasService: AreasService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.areasService.getAreasSelect();
  }
}
