import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/entity/brand.entity';

const _api = 'http://localhost:8080/api/v1/brand/';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Brand>>{
    return this.http.get<Array<Brand>>(_api);
  }

  getByCategory(categoryId: string): Observable<Array<Brand>>{
    return this.http.get<Array<Brand>>(_api + "CategoryId/" + categoryId);
  }
}
