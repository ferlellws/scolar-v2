import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Interrelation } from '../models/interrelation';

@Injectable({
  providedIn: 'root'
})
export class InterrelationsService {
  private readonly API = `${environment.API}/interrelations`;
  
  emitNew = new EventEmitter<any>();
  
  httpOptions!: any;
  
  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };
  };
  
  getInterrelationsAll() {
    return this.http.get<Interrelation[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getInterrelationsCard(id: number) {
    return this.http.get<Interrelation>(`${this.API}/info_card/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getInterrelationsGraph(){ 
    return this.http.get<Interrelation>(`${this.API}/graph`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getInterrelationsGraphByProject(id: number){ 
    return this.http.get<Interrelation>(`${this.API}/graph_by_project/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGeneralTop(){
    return this.http.get<Interrelation>(`${this.API}/general_top`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByResources(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_resources`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByCompanies(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_companies`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByParticpatingAreas(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_areas_participating`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByBelongsAreas(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_areas_belongs`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByApps(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_apps`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByProcessDefinition(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_definition_process`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByVariationDefinition(){
    return this.http.get<Interrelation>(`${this.API}/graph_by_variation_process`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getInterrelationtId(id: number) {
    return this.http.get<Interrelation>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  addInterrelation(interrelation: Interrelation) {
    return this.http.post<Interrelation>(this.API, { interrelation: interrelation }, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  updateInterrelation(interrelation: Interrelation, id: number) {
    return this.http.put<Interrelation>(`${this.API}/${id}`, interrelation, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }

  deleteInterrelation(id: number) {
    return this.http.delete<Interrelation>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
          this.emitNew.emit(data);
        })
      );
  }
}
