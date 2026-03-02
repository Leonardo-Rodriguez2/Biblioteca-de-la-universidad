import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../shaders/API';

@Injectable({
  providedIn: 'root',
})
export class ServiceUsers {
  
  API = API.baseUrl;
  enpoint = API.endpoints.user;

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

  // metodo para los filtros de busqueda
  
  searchUserByCi(ci: string) {
    return this.http.get<any>(`${this.API}${this.enpoint}/ci/${ci}`);
  }

  searchUserByRole(role: string) {
    return this.http.get<any>(`${this.API}${this.enpoint}/role/${role}`);
  }
  
  searchUserByStatus(status: string) {
    return this.http.get<any>(`${this.API}${this.enpoint}/status/${status}`);
  }

  // deleteUser(id: number){
  //   return this.http.delete<any>(`${this.API}${this.enpoint}/${id}`);
  // }

}
