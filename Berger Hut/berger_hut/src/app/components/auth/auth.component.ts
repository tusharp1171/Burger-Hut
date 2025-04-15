import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupRequest } from '../../models/auth/SignupRequest';
import { SigninRequest } from '../../models/auth/SigninRequest';
import { CommonModule } from '@angular/common';
import { AuthResponse } from '../../models/auth/AuthResponse';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  authForm: FormGroup;
  isSignupMode = false;
  message = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService:TokenService,private router: Router ) {
    this.authForm = this.createSigninForm();
  }

  toggleMode() {
    this.isSignupMode = !this.isSignupMode;
    this.authForm = this.isSignupMode ? this.createSignupForm() : this.createSigninForm();
    this.message = '';
  }

  createSigninForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      role: [['user']]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.authForm.invalid) return;
  
    if (this.isSignupMode) {
      const { confirmPassword, ...signupData } = this.authForm.value;
      this.authService.signup(signupData as SignupRequest).subscribe({
        next: (res: AuthResponse) => {
          this.message = 'Signup successful!';
          // Optionally set token if needed
          // this.tokenService.setToken(res.accessToken);
        },
        error: err => this.message = 'Signup failed: ' + err.error.message
      });
    } else {
      const signinData: SigninRequest = this.authForm.value;
      this.authService.signin(signinData).subscribe({
        next: (res: AuthResponse) => {
          this.message = 'Signin successful!';
          this.tokenService.setToken(res.accessToken);
  
          // ✅ Get roles from token
          const roles = this.tokenService.getRoles(); // Decode token and get roles
  
          // ✅ Redirect based on role
          if (roles.includes('ROLE_ADMIN')) {
            this.router.navigate(['/admin']);
          } else if (roles.includes('ROLE_USER')) {
            this.router.navigate(['/menu']);
          } else {
            this.router.navigate(['/unauthorized']);
          }
  
          // Optional: Fetch user ID for later use
          this.tokenService.fetchAndCacheUserId().subscribe(userId => {
            console.log('Fetched User ID:', userId);
          });
        },
        error: err => this.message = 'Signin failed: ' + err.error.message
      });
    }
  }
  
  get f() {
    return this.authForm.controls;
  }
}