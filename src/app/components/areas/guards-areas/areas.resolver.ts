import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { AreasService } from "src/app/services/areas.service";


@Injectable({
  providedIn: 'root'
})
export class AreasResolver implements Resolve<TableData> {

  constructor(
    private areasService: AreasService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.areasService.getAreasAll();
  }
}
