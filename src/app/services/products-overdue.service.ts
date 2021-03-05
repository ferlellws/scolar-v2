import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductOverdue } from '../models/product-overdue';

@Injectable({
  providedIn: 'root'
})
export class ProductsOverdueService {

  private readonly API = `${environment.API}/products_overdue`;

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

  getProductOverdueAll() {
    return this.http.get<ProductOverdue[]>(`${this.API}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap(console.log)
    );
  }

  getProductOverdueId(id: number) {
    return this.http.get<ProductOverdue>(`${this.API}/${id}`, this.httpOptions)
    .pipe(
      // catchError(this.handleError)
      tap((data: any) => {
        // this.emitDataTable.emit(data);
      })
    );
  }

  getProductOverdueByProjectId(id: number) {
    this.getProductOverdueAll().subscribe( (data: ProductOverdue[]) => {
      return data.filter(productOverdue => productOverdue.external_company_tracing!.id == id);
    })
  }

  addProductOverdue(productOverdue: ProductOverdue) {
    return this.http.post<ProductOverdue>(this.API, { product_overdue: productOverdue }, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  updateProductOverdueId(productOverdue: any, id: number) {
    return this.http.put<any>(`${this.API}/${id}`, productOverdue, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  logicalDeleteProductOverdue(id: number) {

    return this.http.put<ProductOverdue>(`${this.API}/${id}/logical_delete`, null, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }

  deleteProductOverdue(id: number) {
    return this.http.delete<ProductOverdue>(`${this.API}/${id}`, this.httpOptions)
      .pipe(
        tap((data: any) => {
        })
      );
  }
}
