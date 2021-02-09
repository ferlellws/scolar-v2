import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemHistoriesFilterService {

  private readonly API = `${environment.API}/item_histories_filter_report`;

  emitFilter = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getFilteredStatus(inputParams: any, filename: string = null){


    
    
    if(inputParams.format == 'json'){
      let httpOptions ={
        headers: new HttpHeaders({
          Authorization: `Bareer ${sessionStorage.token}`
        }),
        params: inputParams,
      }
      return this.http.get<any[]>(`${this.API}`, httpOptions)
      .subscribe((data: any[]) =>
      {
        this.emitFilter.emit({data: data, params: inputParams});
      });
    }else if(inputParams.format == 'excel'){
      let httpOptions ={
        headers: new HttpHeaders({
          Authorization: `Bareer ${sessionStorage.token}`
        }),
        params: inputParams,
        responseType: 'blob' as 'json'
      }
      
      this.http.get(`${this.API}`, httpOptions)
      .subscribe(
        (response: any) =>{
            let dataType = response.type;
            let binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            if (filename){
              downloadLink.setAttribute('download', filename);
            }else{
              downloadLink.setAttribute('download', "Report Status "+ new Date());
            }
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
    }
    
    
  }

}
