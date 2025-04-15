import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { MenuComponent } from './components/menu/menu.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OffersComponent } from './components/offers/offers.component';
import { HappyCustomersComponent } from './components/happy-customers/happy-customers.component';
import { AdminComponent } from './components/Admin/admin/admin.component';
import { authGuard } from './guards/guards/auth.guard';
import { AdminDashboardComponent } from './components/Admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './components/Admin/admin-orders/admin-orders.component';
import { AdminMenuComponent } from './components/Admin/admin-menu/admin-menu.component';
import { AdminOffersComponent } from './components/Admin/admin-offers/admin-offers.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'menu', component: AdminMenuComponent },
      { path: 'offers', component: AdminOffersComponent },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard],
    data: { roles: ['ROLE_USER'] }
  },
  {
    path: 'payment/:orderId',
    component: PaymentComponent
  },
  {
    path: 'offers',
    component: OffersComponent,
  },
  {
    path: 'feed',
    component: HappyCustomersComponent,
  },
  {
    path: '**',
    redirectTo: '',  // Redirect to home if route doesn't match
  },
];