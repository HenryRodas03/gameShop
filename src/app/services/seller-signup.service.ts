import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Signup } from '../models/dataTypes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerSignupService {

  public url = 'http://localhost:8080/api/usuarios/'
  public signupMsg = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(userData: any){
    return this.http.post(`${this.url}login`,userData);
  }
  
  register(data:any){
    return this.http.post(`${this.url}agregar`,data);
  }

}
