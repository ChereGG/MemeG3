import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PostUpload} from '../models/PostUpload.model';

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

  addPost(post: PostUpload, image: File): Observable<any>{
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('description', post.description);
    formData.append('title', post.title);
    formData.append('date', new Date().toISOString().slice(0, 10));
    formData.append('no_likes', '0');

    console.log(baseUrl);
    return this.http.post(baseUrl + '/post', formData);

  }

  getAllProfilePostsByUserID(userID: string): Observable<any>{
    // const token = this.userService.getToken();
    // if (token){
      // this.headers = this.headers.set('Authorization', `Token ${token}`);
    // }
    return this.http.get(baseUrl + '/users/' + userID + '/posts');
  }



}
