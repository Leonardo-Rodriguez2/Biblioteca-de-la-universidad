import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsers {
  
  API = "http://localhost:3000";
  enpoint = "/user"

  constructor(private http: HttpClient){
  };

  getAllUsers(){
    return this.http.get<any>(`${this.API}${this.enpoint}`)
  }

  addUser(body:any) {
    return this.http.post<any>(`${this.API}${this.enpoint}`, body);
  }

  updateUser(id: number, body:any) {
    return this.http.put<any>(`${this.API}${this.enpoint}/${id}`, body);
  }

  // deleteUser(id: number){
  //   return this.http.delete<any>(`${this.API}${this.enpoint}/${id}`);
  // }

}
