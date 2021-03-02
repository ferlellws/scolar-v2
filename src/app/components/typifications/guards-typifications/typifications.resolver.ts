import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { TypificationsService } from "src/app/services/typifications.service";


@Injectable({
  providedIn: 'root'
})
export class TypificationsResolver implements Resolve<TableData> {

  constructor(
    private typificationsService: TypificationsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.typificationsService.getTypificationsAll();
  }
}
