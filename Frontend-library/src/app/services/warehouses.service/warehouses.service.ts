import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../shaders/API';

@Injectable({
  providedIn: 'root',
})
export class WarehousesService {
  
  API = API.baseUrl;
  enpoint = API.endpoints.warehouse;
  
  constructor(private http: HttpClient){
  };
  
  getAllWarehouses(){
    return this.http.get<any>(`${this.API}${this.enpoint}`)
  }
  
  addWarehouse(body:any) {
    return this.http.post<any>(`${this.API}${this.enpoint}`, body);
  }
  
  updateWarehouse(id: number, body:any) {
    return this.http.put<any>(`${this.API}${this.enpoint}/${id}`, body);
  }
}