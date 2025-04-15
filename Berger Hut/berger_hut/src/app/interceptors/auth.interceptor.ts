  import { HttpInterceptorFn } from '@angular/common/http';
  import { inject } from '@angular/core';
  import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

  export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);
    const token = tokenService.getToken();
    console.log(token);
  
    const excludedUrls = ['/api/auth/signin', '/api/auth/signup','/api/offers'];
    const shouldExclude = excludedUrls.some(url => req.url.endsWith(url));
  
    // 🔁 Skip interception for auth endpoints or no token
    if (shouldExclude || !token) {
      return next(req);
    }
  
    // ❌ If token is expired, redirect and cancel request
    if (tokenService.isTokenExpired()) {  
      tokenService.clearToken();
     
      router.navigate(['/auth']); // Redirect to login
      throw new Error('Token expired. Redirecting to login.');
     
    }
  
    // ✅ Add token to header
    const authReq = req.clone({
   
      
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  
    return next(authReq);
  };