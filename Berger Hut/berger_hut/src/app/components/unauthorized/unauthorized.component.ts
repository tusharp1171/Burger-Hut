import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';


@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/auth']);
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
