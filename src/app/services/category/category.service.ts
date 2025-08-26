import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseFilter } from '../../models/baseFilter';
import { PagedResponse } from '../../models/pagedResponse';
import { CategoryRead } from '../../models/categoryRead';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getCategories(filter: BaseFilter){
    return this.http.get<PagedResponse<CategoryRead>>("/api/categories",{ withCredentials: true })
  }
}
