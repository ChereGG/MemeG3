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
    const token = localStorage.getItem('token');
    return this.http.get(baseUrl + '/users/' + id, {
      headers: {
        Authorization: token
      }
    });
  }
  changeImage(data: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(baseUrl + '/change-picture', data, {
      headers: {
        Authorization: token
      }
    });
  }
  changeDescription(data: any): Observable<any> {
      const token = localStorage.getItem('token');
      return this.http.put(baseUrl + '/change-description', data,{
      headers: {
        Authorization: token
      }
    });
  }


    searchUsersByName(name: any): Observable<any>{
      const token = localStorage.getItem('token');
      if (name.trim() !== '') {
      return this.http.get(baseUrl + '/users/' + name, {
      headers: {
        Authorization: token
      }
    });
    }
    else {
      return EMPTY;
    }
  }
  getUserId(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(baseUrl + '/get-user-id', {
      headers: {
        Authorization: token
      }
    });
  }
}
