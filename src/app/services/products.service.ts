import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from '../models/dataTypes';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public url = 'http://localhost:8080/api/productos'

  constructor(private http: HttpClient) { }

  
  getProducts(){
    return this.http.get(`${this.url}`);
  }

  getProduct(id:any){
    return this.http.get(`${this.url}/`,id);
  }
}
