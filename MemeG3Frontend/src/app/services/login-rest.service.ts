import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRestService {
  constructor(private http: HttpClient) { }

  /**
  * based on a username and a password, retrieves a token from the server
  */
  login(username: any, password: any): Observable<any> {
    const formData: any = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post('http://127.0.0.1:8080/token', formData);
  }

  /**
  * Creates a new user on the server
  */
  register(username: string, password: string, firstName: string, lastName: string,
           email: string, description: string, image: File): Observable<any>{
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('descriere', description);
    formData.append('image', image, image.name);
    return this.http.post('http://127.0.0.1:8080/api/users',
      formData, {
        headers: {}
      }
    );
  }

  /**
  * Removes the user token from localstorage
  */
  logout(): void {
    localStorage.clear();
  }
}
