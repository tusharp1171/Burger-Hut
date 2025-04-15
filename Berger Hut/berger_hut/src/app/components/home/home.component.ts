import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private tokenService:TokenService,private auth:AuthService){
  }
  ngOnInit(): void {
    // const username = this.tokenService.getUsernameFromToken();
    // console.log('Logged in user:', username);
  
    // this.tokenService.fetchAndCacheUserId().subscribe(userId => {
    //   console.log('Fetched user ID:', userId);
  
    //   // ✅ Now safe to use cachedUserId
    //   const cachedId = this.tokenService.getCachedUserId();
    //   console.log('Cached user ID (after fetch):', cachedId);
    // });
  }
  


  testimonials = [
    {
      text: `"Best burger I've ever had! Juicy, flavorful, and perfectly grilled."`,
      stars: 5,
      user: '@foodie_jane',
      img: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      text: `"Burger Hut is my go-to spot every weekend. Amazing vibes and service!"`,
      stars: 5,
      user: '@burgerbro',
      img: 'https://randomuser.me/api/portraits/men/35.jpg'
    },
    {
      text: `"Fresh ingredients and creative menu. I recommend the double cheddar blast!"`,
      stars: 5,
      user: '@grillqueen',
      img: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  current = 0;

  nextTestimonial() {
    this.current = (this.current + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.current =
      (this.current - 1 + this.testimonials.length) % this.testimonials.length;
  }
}
