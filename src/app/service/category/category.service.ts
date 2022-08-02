import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/entity/category.entity';
import { Product } from 'src/app/entity/product.entity';

const _api = 'http://localhost:8080/api/v1/category/';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(_api);
  }

}
