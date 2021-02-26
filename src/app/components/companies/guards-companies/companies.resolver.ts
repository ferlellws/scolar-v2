import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { CompaniesService } from "src/app/services/companies.service";


@Injectable({
  providedIn: 'root'
})
export class CompaniesResolver implements Resolve<TableData> {

  constructor(
    private companiesService: CompaniesService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<TableData> |Promise<any>|any{
      return this.companiesService.getCompaniesAll();
  }
}
