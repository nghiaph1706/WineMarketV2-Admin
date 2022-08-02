import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/entity/cart.entity';
import { CartDetails } from 'src/app/entity/cartDetails.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'https://winemarketv2-server.herokuapp.com/api/v1/cart/';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  find(cart_Id: string): Observable<Cart> {
    return this.http.get<Cart>(
      _api + cart_Id,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  checkout(cart_Id: string, data: any): Observable<any>{
    return this.http.post<Cart>(
      _api + 'checkout/' + cart_Id,
      data,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  getAll(): Observable<Array<any>> {
    return this.http.get<Array<any>>(
      _api,
      {
        headers: this.authService.getHeaders()
      }
    )
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

  filter(date: string, username: string, status: string): Observable<Array<any>>{
    return this.http.get<Array<any>>(
      _api + "filter?_date=" + date + "&_username=" + username + "&_status=" + status,
      {
        headers: this.authService.getHeaders()
      }
    );
  }
}
