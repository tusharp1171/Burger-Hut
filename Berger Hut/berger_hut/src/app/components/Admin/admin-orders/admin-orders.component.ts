import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../../../models/OrderItem';
import { OrderService } from '../../../services/Order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders',
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {
  pendingOrders: Order[] = [];

  constructor(private orderService: OrderService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fetchPendingOrders();
  }

  fetchPendingOrders(): void {
    this.orderService.getPendingOrders().subscribe(
      (orders) => {
        this.pendingOrders = orders;
      },
      (error) => {
        console.error('Error fetching pending orders:', error);
      }
    );
  }

  calculateTotal(items: any[]): number {
    return items.reduce((total, item) => {
      const price = item.menuItem?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  }

  completeOrder(orderId: number): void {
    this.orderService.completeOrder(orderId).subscribe({
      next: (res) => {
        this.pendingOrders = this.pendingOrders.filter(order => order.id !== orderId);
  
        this.snackBar.open(res.message, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error('❌ Error completing order', err);
        this.snackBar.open('❌ Failed to complete order.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  
  
}