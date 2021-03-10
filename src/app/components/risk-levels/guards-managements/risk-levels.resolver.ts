import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { RiskLevelsService } from "src/app/services/risk-levels.service";


@Injectable({
  providedIn: 'root'
})
export class RiskLevelsResolver implements Resolve<TableData> {

  constructor(
    private riskLevelsService: RiskLevelsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.riskLevelsService.getRiskLevelsAll();
  }
}
