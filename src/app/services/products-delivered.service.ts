import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductDelivered } from '../models/product-delivered';

@Injectable({
  providedIn: 'root'
})
export class ProductsDeliveredService {

  private readonly API = `${environment.API}/ec_delivered_products`;

  inputParams: any = {
    user_email: JSON.parse(localStorage.user).email,
    user_token: JSON.parse(localStorage.user).authentication_token
  };

  httpOptions!: any;

  constructor(
    private http: HttpClient
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bareer ${localStorage.token}`
        }),
        params: this.inputParams
      };
  }

  getProductToBeDeliveredAll() {
    return this.http.get<ProductDelivered[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProductDeliveredId(id: number) {
    return this.http.get<ProductDelivered>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getProductDeliveredByProjectId(id: number) {
    this.getProductToBeDeliveredAll().subscribe( (data: ProductDelivered[]) => {
      return data.filter(productDelivered => productDelivered.external_company_tracing!.id == id);
    })
  }

  addProductDelivered(productDelivered: ProductDelivered) {
    return this.http.post<ProductDelivered>(this.API, { ec_delivered_product: productDelivered }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateProductDeliveredId(productDelivered: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, productDelivered, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  logicalDeleteProductDelivered(id: number) {

    return this.http.put<ProductDelivered>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteProductDelivered(id: number) {
    return this.http.delete<ProductDelivered>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

}
