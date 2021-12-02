import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
    headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

    getUserById(id: string): Observable<any>{
    // const token = this.userService.getToken();
    // if (token){
      // this.headers = this.headers.set('Authorization', `Token ${token}`);
    // }
    return this.http.get(baseUrl + '/users/' + id);
  }
  changeImage(data: any): Observable<any> {
      return this.http.put(baseUrl + '/change-picture', data);
  }
  changeDescription(data: any): Observable<any> {
      return this.http.put(baseUrl + '/change-description', data);
  }


    searchUsersByName(name: any): Observable<any>{
    // const token = this.userService.getToken();
    // if (token){
    // this.headers = this.headers.set('Authorization', `Token ${token}`);
    // }
    if (name.trim() !== '') {
      return this.http.get(baseUrl + '/users/' + name);
    }
    else {
      return EMPTY;
    }
  }
}
