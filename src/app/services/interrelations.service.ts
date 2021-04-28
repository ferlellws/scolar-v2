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

  getVicepresidency() {
    return this.http.get<Interrelation>(`${this.API}/projects_by_vicepresidency`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidency(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_by_vicepresidency/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidencyByResources(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_resources/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidencyByCompanies(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_companies/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidencyByAreasParticipating(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_areas_participating/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidencyByAreasBelongs(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_areas_belongs/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  getGraphVicepresidencyByApps(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_apps/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }
  
  getGraphVicepresidencyByDefinitionProcess(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_definition_process/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphVicepresidencyByVariationProcess(id: number) {
    return this.http.get<Interrelation>(`${this.API}/graph_vice_by_variation_process/${id}`, this.httpOptions)
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

  getGraphByResources(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_resources/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByCompanies(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_companies/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByParticpatingAreas(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_areas_participating/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByBelongsAreas(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_areas_belongs/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByApps(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_apps/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByProcessDefinition(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_definition_process/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getGraphByVariationDefinition(id: any){
    return this.http.get<Interrelation>(`${this.API}/graph_by_variation_process/${id}`, this.httpOptions)
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
