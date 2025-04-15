import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

  orderId!: number;
  selectedMethod: string = 'CASH';
  paymentSuccess: boolean = false;
  paymentError: boolean = false;

  paymentMethods: string[] = ['CASH', 'CARD', 'UPI', 'WALLET', 'NET_BANKING', 'PAY_LATER'];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
  }

  makePayment(): void {
    const paymentData = {
      orderId: this.orderId,
      paymentMethod: this.selectedMethod
    };

    this.http.post('http://localhost:8080/api/payments', paymentData).subscribe(
      (response) => {
        this.paymentSuccess = true;
        this.paymentError = false;
        console.log('Payment successful', response);
      },
      (error) => {
        this.paymentSuccess = false;
        this.paymentError = true;
        console.error('Payment failed', error);
      }
    );
  }
}