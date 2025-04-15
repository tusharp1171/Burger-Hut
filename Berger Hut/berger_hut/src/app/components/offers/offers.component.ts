import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OffersService } from '../../services/offers/offers.service';
import { Offer } from '../../models/Offer';

@Component({
  selector: 'app-offers',
  imports: [CommonModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];

  constructor(private offerService: OffersService) {}

  ngOnInit(): void {
    this.loadOffers();
  }

  loadOffers(): void {
    this.offerService.getAllOffers().subscribe({
      next: (data) => this.offers = data,
      error: (err) => console.error('Error loading offers:', err)
    });
  }
}