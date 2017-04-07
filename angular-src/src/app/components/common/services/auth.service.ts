import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  user: any;
  authToken: any;
  baseURL: String;
  
  constructor(private http: Http) { 
    this.baseURL = 'http://localhost:3000/api/v1';
  }
  
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let api = this.baseURL + '/users/register';
    return this.http.post(api, user, {headers: headers}).map(res => res.json());
  }
  
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let api = this.baseURL + '/users/authenticate';
    return this.http.post(api, user, {headers: headers}).map(res => res.json());
  }
  
  saveUserDataLocally(token, user) {
    //User id_token to store token because angualr jwt uses this key to verify token
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', user);
    this.user = user;
    this.authToken = token;
  }
  
  logout() {
    localStorage.clear();
    this.user = null;
    this.authToken = null;
  }
  
  isLoggedIn() {
    //It automatically checks if id_token is saved in local storage or not and returns true if token exists.
    return tokenNotExpired();
  }
  
  //Get user profile data
  getUserProfile() {
  
  }

}
