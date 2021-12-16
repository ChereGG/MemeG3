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
    const token = localStorage.getItem('token');
    return this.http.get(baseUrl + '/posts', {
      headers: {
        Authorization: token
      }
    });
  }

  addPost(post: PostUpload, image: File): Observable<any>{
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('description', post.description);
    formData.append('title', post.title);
    formData.append('date', new Date().toISOString());
    formData.append('no_likes', '0');

    return this.http.post(baseUrl + '/post', formData, {
      headers: {
        Authorization: token
      }
    });
  }

  getAllProfilePostsByUserID(userID: string): Observable<any>{
   const token = localStorage.getItem('token');
   return this.http.get(baseUrl + '/users/' + userID + '/posts', {
      headers: {
        Authorization: token
      }
    });
  }

  likePost(data: any, postID: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put('http://localhost:8080/api/posts/' + postID.toString() + '/like-post', data,
      {
        headers: {
          Authorization: token
        }
      });
  }

  addComment(comment): Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.post(baseUrl + '/comments', comment,{
      headers: {
        Authorization: token
      }
    });
  }







}
