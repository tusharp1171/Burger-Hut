import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-happy-customers',
  imports: [CommonModule],
  templateUrl: './happy-customers.component.html',
  styleUrl: './happy-customers.component.css'
})
export class HappyCustomersComponent {
  customerPosts = [
    {
      name: 'Riya Sharma',
      caption: 'Loved the cheesy burger! 🍔',
      media: 'assets/images/customers/custo1.jpg',
      type: 'image'
    },
    {
      name: 'Aman Verma',
      caption: 'Best burger ever! 🎥',
      media: 'https://www.youtube.com/shorts/7i9b4u9VGbs',
      type: 'video'
    },
    {
      name: 'Neha Sinha',
      caption: 'Weekend treats with the gang 🍟',
      media: 'assets/images/customers/custo2.jpg',
      type: 'image'
    }
  ];
}