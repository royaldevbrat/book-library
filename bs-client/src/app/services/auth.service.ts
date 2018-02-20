import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
// import {tokenNotExpired} from 'angular2-jwt';
import { Observable } from 'rxjs/Rx';
import { SERVER_HOST } from './constants';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  isDev:boolean;
  profile:any;
  constructor(private http:Http) {
    this.isDev = false; // Change to false before deployment
  }
  
  sendFileToUpload(files){
    let formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i], files[i].name);
    }
    let ep = this.prepEndpoint('sendfiles/upload');
    return this.http.post(ep, formData)
      .map(res => res.json());
  }
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/authenticate');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }
  addNewUser(user){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/addNewUser');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }
  deleteUser(id){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('users/deleteUser/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  getAllUsers(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/getAllUsers');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('users/profile');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Books
  addNewBooks(book){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('books/addNewBook');
    return this.http.post(ep, book,{headers: headers})
      .map(res => res.json());
  }
  getAllBooks(){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('books/fetchAllBooks');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  getTopFiveBooks(){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('cashe/fetchTopAllBooks');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }
  searchInBooks(sdata){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('books/searchInAllBooks');
    return this.http.post(ep, sdata, {headers: headers})
      .map(res => res.json());
  }
  
  increaseCounter(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/increaseCounter/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  deleteBooks(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/deletebooks/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  editBooks(id){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/editbooks/'+id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  updateBooks(task){
    let headers = new Headers();
    this.loadToken();
    // headers.append('Authorization', this.authToken);
    let ep = this.prepEndpoint('books/updatebooks/'+task._id);
    return this.http.post(ep,task, {headers: headers})
      .map(res => res.json());
  }
  
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn(){
  //   return tokenNotExpired();
  // }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  prepEndpoint(ep) {
      return SERVER_HOST + ep;
  }

}

