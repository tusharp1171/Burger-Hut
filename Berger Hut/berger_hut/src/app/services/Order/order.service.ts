import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/OrderItem';
import { Cart } from '../../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';  // Update to your API endpoint

  constructor(private http: HttpClient) {}


  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  // Get all orders for a user
  getOrders(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Place a new order
  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // Get order details by ID
  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

   getCart(userId: number): Observable<Cart> {
      return this.http.get<Cart>(`http://localhost:8080/api/cart/user/${userId}`);
    }


    getPendingOrders(): Observable<Order[]> {
      return this.http.get<Order[]>(this.apiUrl+"/"+"pending");
    }

    completeOrder(orderId: number): Observable<{ message: string }> {
      return this.http.put<{ message: string }>(`${this.apiUrl}/${orderId}/complete`, {});
    }
    
}
