import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Highlight } from '../models/highlight';
import { ProductToBeDelivered } from '../models/product-to-be-delivered';

@Injectable({
  providedIn: 'root'
})
export class ProductsToBeDeliveredService {
  private readonly API = `${environment.API}/products_to_be_delivered`;

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
    return this.http.get<ProductToBeDelivered[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProductToBeDeliveredId(id: number) {
    return this.http.get<ProductToBeDelivered>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getProductToBeDeliveredByProjectId(id: number) {
    this.getProductToBeDeliveredAll().subscribe( (data: ProductToBeDelivered[]) => {
      return data.filter(productToBeDelivered => productToBeDelivered.external_company_tracing!.id == id);
    })
  }

  addProductToBeDelivered(productToBeDelivered: ProductToBeDelivered) {
    return this.http.post<ProductToBeDelivered>(this.API, { product_to_be_delivered: productToBeDelivered }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateProductToBeDeliveredId(productToBeDelivered: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, productToBeDelivered, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  logicalDeleteProductToBeDelivered(id: number) {

    return this.http.put<ProductToBeDelivered>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteProductToBeDelivered(id: number) {
    return this.http.delete<ProductToBeDelivered>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
