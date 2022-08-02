import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/entity/user.entity';
import { AuthService } from '../utils/auth.service';

const _api = 'http://localhost:8080/api/v1/user/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) { }

  login(data: any): Observable<any>{
    return this.http.post<any>(_api + 'login', data);
  }

  logout(){
    this.cookieService.delete('token');
    this.cookieService.delete('user_Id');
    this.cookieService.delete('isAdmin');
    window.location.reload()
  }

  find(user_Id: string): Observable<User>{
    return this.http.get<User>(
      _api + user_Id, 
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  update(data: any): Observable<User>{
    return this.http.put<User>(
      _api, 
      data,
      {
        headers: this.authService.getHeaders()
      }
    )
  }

  getAll(): Observable<Array<User>>{
    return this.http.get<Array<User>>(
      _api, 
      {
        headers: this.authService.getHeaders()
      }
    )
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

  delete(id: string): Observable<any>{
    return this.http.delete<any>(
      _api + id,
      {
        headers: this.authService.getHeaders()
      }
    );
  }

  filter(username: string, email: string, role: string): Observable<Array<any>>{
    return this.http.get<Array<any>>(
      _api + "filter?_username=" + username + "&_email=" + email + "&_role=" + role,
      {
        headers: this.authService.getHeaders()
      }
    );
  }

}
