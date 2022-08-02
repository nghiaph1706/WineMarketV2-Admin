import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDetails } from 'src/app/entity/cartDetails.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'http://localhost:8080/api/v1/cartdetails/';
@Injectable({
  providedIn: 'root'
})
export class CartDetailsService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  create(data: any): Observable<CartDetails>{
    return this.http.post<CartDetails>(
      _api,
      data,
      {
        headers: this.authService.getHeaders()
      }
    );
  }

  findByCartId(cart_Id: string): Observable<Array<any>>{
    return this.http.get<Array<any>>(
      _api + 'CartId/' + cart_Id,
      {
        headers: this.authService.getHeaders()
      }
    )
  }
}
