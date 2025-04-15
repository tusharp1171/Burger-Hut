import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'berger_hut';
  showHeader = true;

  constructor(private router: Router) {
    // Listen for route changes and update the visibility of the header
    this.router.events  
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // If the route is 'admin', hide the header
        this.showHeader = !event.urlAfterRedirects.includes('/admin');
        this.showHeader = !event.urlAfterRedirects.includes('/auth');
      });
  }
 
}
