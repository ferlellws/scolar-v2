import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { CompanyTypesService } from "src/app/services/company-types.service";


@Injectable({
  providedIn: 'root'
})
export class CompanyTypesResolver implements Resolve<TableData> {

  constructor(
    private companyTypesService: CompanyTypesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<TableData> {
      return this.companyTypesService.getCompanyTypesAll();
  }
}
