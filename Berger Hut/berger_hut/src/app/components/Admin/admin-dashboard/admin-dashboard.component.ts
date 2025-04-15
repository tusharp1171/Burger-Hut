import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service';
import { Order } from '../../../models/OrderItem';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  stats = [
    { label: 'Today', orders: 0, totalAmount: 0 },
    { label: 'This Week', orders: 0, totalAmount: 0 },
    { label: 'This Month', orders: 0, totalAmount: 0 },
    { label: 'All Time', orders: 0, totalAmount: 0 },
  ];

  allOrders: Order[] = [];
  selectedOrders: Order[] = [];
  selectedStat: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.allOrders = orders;

      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      let todayStats = { orders: 0, totalAmount: 0 };
      let weekStats = { orders: 0, totalAmount: 0 };
      let monthStats = { orders: 0, totalAmount: 0 };
      let allTimeStats = { orders: 0, totalAmount: 0 };

      orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        const totalAmount = order.items?.reduce((sum: number, item: any) => {
          return sum + item.quantity * item.menuItem.price;
        }, 0) || 0;

        allTimeStats.orders += 1;
        allTimeStats.totalAmount += totalAmount;

        if (orderDate >= startOfMonth) {
          monthStats.orders += 1;
          monthStats.totalAmount += totalAmount;
        }

        if (orderDate >= startOfWeek) {
          weekStats.orders += 1;
          weekStats.totalAmount += totalAmount;
        }

        if (orderDate >= startOfToday) {
          todayStats.orders += 1;
          todayStats.totalAmount += totalAmount;
        }
      });

      this.stats = [
        { label: 'Today', ...todayStats },
        { label: 'This Week', ...weekStats },
        { label: 'This Month', ...monthStats },
        { label: 'All Time', ...allTimeStats },
      ];
    });
  }


  selectStat(label: string) {
    this.selectedStat = label;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.selectedOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        if (label === 'Today') return orderDate >= startOfToday;
        if (label === 'This Week') return orderDate >= startOfWeek;
        if (label === 'This Month') return orderDate >= startOfMonth;
        return true;
      });
    });
  }
  
  getOrderAmount(order: Order): number {
    return order.items?.reduce((sum, item) => sum + item.quantity * item.menuItem.price, 0) || 0;
  }
  
}