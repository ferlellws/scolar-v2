import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SupportResourcesService } from 'src/app/services/support-resources.service';

@Injectable({
  providedIn: 'root'
})
export class SupportResourcesResolver implements Resolve<boolean> {
  constructor(
    private supportResourcesService: SupportResourcesService
  ) {}
  
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.supportResourcesService.getSupportResourceProjectId(route.params.id)
  }
}
