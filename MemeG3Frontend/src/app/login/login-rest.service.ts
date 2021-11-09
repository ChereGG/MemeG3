import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {
  constructor(private http: HttpClient) { }

  login(username: any, password: any) {
    alert("login. username: " + username + " password: " + password);
  }

  register(username: any, password: any) {
    alert("register. username: " + username + " password: " + password);
  }
}
