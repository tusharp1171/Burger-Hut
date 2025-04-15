import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();

  // 🔒 If there's no token or it's expired, redirect to login
  if (!token || tokenService.isTokenExpired()) {
    tokenService.clearToken();
    router.navigate(['/auth']);
    return false;
  }

  // ✅ Check if user has the required role
  const userRoles = tokenService.getRoles(); // e.g., ['ROLE_USER'], ['ROLE_ADMIN']
  const requiredRoles = route.data?.['roles'] as string[] || [];

  const hasAccess = requiredRoles.length === 0 || requiredRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    // 🚫 If user is logged in but doesn't have permission
    router.navigate(['/unauthorized']); // Create this page or choose where to go
    return false;
  }

  return true;
};