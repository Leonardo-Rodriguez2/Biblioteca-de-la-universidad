import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../shaders/API';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  
  API = API.baseUrl;
  enpoint = API.endpoints.login;

  constructor(private http: HttpClient){

  };

  authLogin(body:any){
      return this.http.post(`${this.API}${this.enpoint}`, body)
  }

}
