import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const _api = 'http://localhost:8080/api/v1/upload/';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private authService: AuthService, private cookieService: CookieService) { }

  uploadImage(image: FormData, entity: string): Observable<any>{
    console.log(_api + entity)
    return this.http.post<any>(
      _api + entity, 
      image,
      {
        headers: this.authService.getHeaders()
      }
      );
  }
}
