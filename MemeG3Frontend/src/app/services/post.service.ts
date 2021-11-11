import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  getAllFeedPosts(): Observable<any>{
    // const token = this.userService.getToken();
    // if (token){
      // this.headers = this.headers.set('Authorization', `Token ${token}`);
    // }
    return this.http.get(baseUrl + '/posts');
  }
}
