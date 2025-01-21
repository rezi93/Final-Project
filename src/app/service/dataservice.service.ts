import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, map, Observable, tap } from 'rxjs';
import { ProductInterface } from '../interfaces/product-interface';
import { LoginCredentials, LoginData, LoginResponse } from '../interfaces/logininterface';

@Injectable({
  providedIn: 'root',
  
})
export class DataserviceService {
 

  items:ProductInterface[]=[]
  users:any=[]
  product:ProductInterface[]=[]
  private cartItems: ProductInterface[] = [];

  constructor(private http:HttpClient) { }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://fake-store-api.mock.beeceptor.com/api/users', credentials)
      .pipe(
        catchError((error: any) => {
          console.error('Login error:', error);
          throw new Error('Login failed. Please try again.');
        })
      );
  }

  getItems():Observable<ProductInterface[]>{
return this.http.get<ProductInterface[]>('https://fake-store-api.mock.beeceptor.com/api/products')
  }

  getAllUsers(): Observable<LoginData[]> {
    return this.http.get<LoginData[]>('https://fake-store-api.mock.beeceptor.com/api/users');
  }

  

  addToCart(product: ProductInterface): void {
    this.cartItems.push(product);
  }
  getCartItems(): ProductInterface[] {
    return [...this.cartItems];
  }

  removeFromCart(product: ProductInterface): void {
    const index = this.cartItems.findIndex(item => item.product_id === product.product_id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  

  

 
}
