import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceSubject {
  
  API = "http://192.168.100.34:3000";
  enpoint = "/subject"
  
  constructor(private http: HttpClient){
  };
  
  getAllSubject(){
    return this.http.get<any>(`${this.API}${this.enpoint}`)
  }
  
  addSubject(body:any) {
    return this.http.post<any>(`${this.API}${this.enpoint}`, body);
  }
  
  updateSubject(id: number, body:any) {
    return this.http.put<any>(`${this.API}${this.enpoint}/${id}`, body);
  }
  
  deleteSubject(id: number){
    return this.http.delete<any>(`${this.API}${this.enpoint}/${id}`);
  }

}

