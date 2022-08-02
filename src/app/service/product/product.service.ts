import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/entity/product.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'https://winemarketv2-server.herokuapp.com/api/v1/product/';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  find(id: string): Observable<Product> {
    return this.http.get<Product>(_api + id);
  }

  getProductsLimit(_limit: number = 4, _page: number = 0, _sort: string = 'id', _order: string = 'desc',
    name_like: string = '', category_Id: string = '', brand_Id: string = ''): Observable<Array<any>> {
    return this.http.get<Array<any>>(_api + '?_limit=' + _limit + '&_page=' + _page + '&_sort=' + _sort + '&_order=' + _order + '&name_like=' + name_like + '&category_Id=' + category_Id + '&brand_Id=' + brand_Id);
  }

  create(data: any): Observable<any>{
    return this.http.post<any>(
      _api, 
      data,
      {
        headers: this.authService.getHeaders()
      }
    );
  }

  update(data: any): Observable<any>{
    return this.http.put<any>(
      _api, 
      data,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  delete(id: string): Observable<any>{
    return this.http.delete<any>(
      _api + id,
      {
        headers: this.authService.getHeaders()
      }
    );
  }


}
