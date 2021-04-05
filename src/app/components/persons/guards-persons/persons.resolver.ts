import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { TableData } from "src/app/models/table-data";
import { PersonsService } from "src/app/services/persons.service";
import { UserService } from "src/app/services/user.service";


@Injectable({
  providedIn: 'root'
})
export class PersonsResolver implements Resolve<TableData> {

  constructor(
    private personsService: PersonsService,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<TableData> |Promise<any>|any{
      return this.personsService.getTablaPeople();
  }
}
