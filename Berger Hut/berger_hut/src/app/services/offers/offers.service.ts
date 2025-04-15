import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../../models/Offer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  private baseUrl = 'http://localhost:8080/api/offers'; // Adjust if your backend endpoint is different

  constructor(private http: HttpClient) {}

  getAllOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrl);
  }

  getOfferById(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.baseUrl}/${id}`);
  }

  // createOffer(offer: Offer): Observable<Offer> {
  //   return this.http.post<Offer>(this.baseUrl, offer);
  // }

  createOffer(formData: FormData): Observable<Offer> {
    return this.http.post<Offer>(this.baseUrl, formData);
  }

  updateOffer(id: number, formData: FormData): Observable<Offer> {
    return this.http.put<Offer>(`${this.baseUrl}/${id}`, formData);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
