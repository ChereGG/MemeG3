import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {
  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    // const options = {
    //   form
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   }
    // };
    return this.http.post('http://127.0.0.1:8080/token', formData);
    // alert('login. username: ' + username + ' password: ' + password);
  }

  register(username: any, password: any): Observable<any>{
    const options = {
      headers: {
      //   'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({
      username,
      password,
    });
    return this.http.post('http://127.0.0.1:8080/api/users', body, options);
    // alert('register. username: ' + username + ' password: ' + password);
  }
}
