import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

// MODELS
import { Page } from 'src/app/app.component';

// SERVICES
import { PagesService } from 'src/app/services/pages.service';

@Injectable({
  providedIn: 'root'
})
export class PagesResolver implements Resolve<Page> {

  constructor(
    private pageService: PagesService
  ) {}

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Page> |Promise<any>|any{
      return this.pageService.getPagesWithoutModule();
  }
}
