import { Component, OnInit } from '@angular/core';
import { Cart } from '../../models/cart-item';
import { CartService } from '../../services/Cart/cart.service';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/Order/order.service';
import { Order, OrderRequest } from '../../models/OrderItem';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart!: Cart;
  currentUserId: number | null = null;
  currentUsername: string = 'exampleUser'; // Replace with actual username

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
  
    // Check if the token is expired or not present
    if (!token || this.tokenService.isTokenExpired()) {
      console.error('Token expired or not found. Redirecting to login.');
      this.tokenService.clearToken();
      this.router.navigate(['/auth']);
      return; // Don't proceed with the rest of the logic
    }
  
    // Proceed with fetching the user ID only if the token is valid
    const username = this.tokenService.getUsernameFromToken();
    this.tokenService.fetchAndCacheUserId().subscribe(userId => {
      this.currentUserId = userId ?? null;
  
      if (this.currentUserId !== null) {
        this.loadCart(); // ✅ Safe to load cart now
      } else {
        console.error('User ID is null. Redirecting to login.');
        this.router.navigate(['/auth']);
      }
    });
  }
  

  loadCart(): void {
    if (this.currentUserId === null) return;

    this.cartService.getCartByUserId(this.currentUserId).subscribe(
      (data) => this.cart = data,
      (error) => console.error('Error loading cart:', error)
    );
  }

  placeOrder(): void {
    const totalAmount = this.getTotalPrice();

    if (totalAmount <= 0) {
      alert('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (this.currentUserId === null) {
      console.error('User ID is null. Cannot place order.');
      return;
    }

    const orderData = this.prepareOrderData();

    this.orderService.placeOrder(orderData).subscribe(
      (order) => {
        console.log('Order placed successfully:', order);
        this.clearCart();
        this.router.navigate(['/payment', order.id]);
      },
      (error) => console.error('Error placing order:', error)
    );
  }

  clearCart(): void {
    if (this.currentUserId === null) return;

    this.cartService.clearCart(this.currentUserId).subscribe(
      () => this.loadCart(),
      (error) => console.error('Error clearing cart:', error)
    );
  }

  prepareOrderData(): Order {
    if (this.currentUserId === null) {
      throw new Error('User ID is null. Cannot prepare order data.');
    }

    return {
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      user: {
        id: this.currentUserId,
        username: this.currentUsername
      },
      items: this.cart.items.map(item => ({
        quantity: item.quantity,
        menuItem: {
          id: item.menuItem.id,
          name: item.menuItem.name,
          price: item.menuItem.price
        }
      }))
    };
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateCartItem(item);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    } else {
      this.removeCartItem(item.id);
    }
  }

  updateCartItem(item: any): void {
    const updatedItemDto = {
      id: item.id,
      quantity: item.quantity,
      menuItem: { id: item.menuItem.id },
      cart: { id: this.cart.id }
    };

    this.cartService.updateCartItem(updatedItemDto).subscribe(
      () => {},
      (error) => console.error('Error updating cart item:', error)
    );
  }

  removeCartItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe(
      () => {
        this.cart.items = this.cart.items.filter((item) => item.id !== itemId);
      },
      (error) => console.error('Error removing cart item:', error)
    );
  }

  getTotalPrice(): number {
    return this.cart?.items?.reduce((total, item) =>
      total + (item.menuItem.price * item.quantity), 0) ?? 0;
  }
}