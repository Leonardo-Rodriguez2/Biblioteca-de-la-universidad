import { Injectable } from '@angular/core';
import { API } from '../../shaders/API';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceCategory {
  
  API = API.baseUrl;
  enpoint = API.endpoints.category;
  
  constructor(private http: HttpClient){
  };
  
  getAllCategories(){
    return this.http.get<any>(`${this.API}${this.enpoint}`);
  }
  
  addCategory(body:any) {
    return this.http.post<any>(`${this.API}${this.enpoint}`, body);
  }
  
  updateCategory(id: number, body:any) {
    return this.http.put<any>(`${this.API}${this.enpoint}/${id}`, body);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${this.API}${this.enpoint}/${id}`);
  }

}