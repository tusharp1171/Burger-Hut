import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  navOpen: boolean = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }
  
  closeNav(): void {
    this.navOpen = false;
  }

}
