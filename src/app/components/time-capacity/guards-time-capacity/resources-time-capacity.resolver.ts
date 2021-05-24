import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PersonsService } from 'src/app/services/persons.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesTimeCapacityResolver implements Resolve<boolean> {
  constructor(
    private personsService: PersonsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.personsService.getPersons();
  }
}
