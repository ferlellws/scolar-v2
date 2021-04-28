import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InterrelationsService } from 'src/app/services/interrelations.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralTopResolver implements Resolve<boolean> {
  
  constructor(
    private interrelationsService: InterrelationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.interrelationsService.getGeneralTop();
  }
}
