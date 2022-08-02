import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  getHeaders(): HttpHeaders{
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.cookieService.get('token'))
  }

  isLogin(): boolean{
    try {
      if (this.cookieService.get('token').length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  isAdmin(): boolean{
    try {
      return Boolean(JSON.parse(this.cookieService.get('isAdmin')))
    } catch (error) {
      return false;
    }
  }

}
