import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PnfService {
  API = "http://localhost:3000";
  enpoint = "/pnf";
  
  constructor(private http: HttpClient){
  };
  
  getAllPnf(){
    return this.http.get<any>(`${this.API}${this.enpoint}`)
  }
  
  addPnf(body:any) {
    return this.http.post<any>(`${this.API}${this.enpoint}`, body);
  }
  
  updatePnf(id: number, body:any) {
    return this.http.put<any>(`${this.API}${this.enpoint}/${id}`, body);
  }
  
}