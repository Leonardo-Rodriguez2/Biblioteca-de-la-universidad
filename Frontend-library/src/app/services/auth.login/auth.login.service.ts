import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  
  API = "http://localhost:3000";
  enpoint = "/login"

  constructor(private http: HttpClient){

  };

  authLogin(body:any){
      return this.http.post(`${this.API}${this.enpoint}`, body)
  }



}
