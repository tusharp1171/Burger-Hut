import { Component } from '@angular/core';
import { Category } from '../../models/Category';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/MenuItem';
import { CartService } from '../../services/Cart/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenService } from '../../services/token.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  categories: Category[] = [];
  userId: number | null = null;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private tokenService: TokenService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.http.get<Category[]>('http://localhost:8080/api/categories').subscribe(data => {
      this.categories = data;
    });

    this.tokenService.fetchAndCacheUserId().subscribe(userId => {
      this.userId = userId ?? null;

      if (this.userId === null) {
        console.error('User ID is null. Redirecting to login.');
        // Handle login redirection if needed
      }
    });
  }

  addToCart(item: MenuItem): void {
    if (this.userId === null) {
      this.snackBar.open('You are not logged in. Please log in to continue...', 'Close', {
        duration: 3000,
        panelClass: ['snack-error']
      });

      setTimeout(() => {
        this.router.navigate(['/auth']);
      }, 1000);
  
      
      return;
    }

    const cartItemDto = {
      userId: this.userId,
      menuItemId: item.id,
      quantity: 1
    };

    this.cartService.addToCart(cartItemDto).subscribe(
      () => {
        console.log('Item added to cart');
        this.snackBar.open(`✅ ${item.name} added to cart!`, 'Close', {
          duration: 3000,
          panelClass: ['snack-success']
        });
      },
      (error) => {
        console.error('Error adding to cart:', error);
        this.snackBar.open('Failed to add item to cart', 'Close', {
          duration: 3000,
          panelClass: ['snack-error']
        });
      }
    );
  }
}