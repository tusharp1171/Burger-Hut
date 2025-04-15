import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {}

  getCartByUserId(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/user/${userId}`);
  }

  createOrUpdateCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  removeItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`);
  }
  updateCartItem(item: any) {
    return this.http.put(`${this.apiUrl}/items/${item.id}`, item);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear/${userId}`);
  }

  addToCart(cartItem: { userId: number, menuItemId: number, quantity: number }): Observable<any> {
    return this.http.post('http://localhost:8080/api/cart/add', cartItem);
  }

  getCart(userId: number): Observable<Cart> {
  return this.http.get<Cart>(`http://localhost:8080/api/cart/user/${userId}`);
}
  
}
