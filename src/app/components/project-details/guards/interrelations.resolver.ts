import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterrelationsResolver implements Resolve<boolean> {
  constructor(
    private interrelationsService: InterrelationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> |Promise<any>|any{
      environment.consoleMessage(route.params.id, "ID PROYETO INTERRELACIONES");
      //return this.interrelationsService.getInterrelationsCard(route.params.id);
  }
}
