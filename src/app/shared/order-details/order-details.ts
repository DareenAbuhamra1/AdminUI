import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, signal } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { DatePipe, DecimalPipe } from '@angular/common';

export interface OrderOptionDetailsDto {
  orderOptionId: number;
  orderOptionName: string;
  orderOptionQuantity: number;
  orderOptionPrice: number;
}

export interface OrderLineDetailsDto {
  orderItemId: number;
  orderItemName: string;
  orderItemPrice: number;
  quantity: number;
  orderItemOptions?: OrderOptionDetailsDto[];
}

export interface OrderDetailedDto {
  partnerName: string;
  partnerLocation: string;
  customerName: string;
  customerLocation: string;
  driverName?: string;
  subTotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPayment: number;
  paymentType: string;
  acceptedTime?: string;
  deliveredTime?: string;
  pickedUpTime?: string;
  placementTime?: string;
  orderItems: OrderLineDetailsDto[];
}

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails implements OnInit {
  @Input() orderId!: number;
  @Input() role!: 'customer' | 'driver' | 'partner' | 'admin';

  orderDetails = signal<OrderDetailedDto | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(
    private http : HttpClient,
  ){}

  ngOnInit() {
    if (!this.role) {
      this.role = (localStorage.getItem('role')?.toLowerCase() as any) || 'customer';
    }

    if (this.orderId) {
      this.getOrderDetails(this.orderId);
    }
  }

  getOrderDetails(orderId: number) {
    this.isLoading.set(true);
    this.error.set(null);

    let baseUrl = '';
    switch (this.role) {
      case 'customer': baseUrl = environment.apiUrls.customer; break;
      case 'driver': baseUrl = environment.apiUrls.driver; break;
      case 'partner': baseUrl = environment.apiUrls.partner; break;
      case 'admin': baseUrl = environment.apiUrls.admin; break;
      default: baseUrl = environment.apiUrls.customer;
    }

    this.http.get<OrderDetailedDto>(`${baseUrl}/Order/order-details/${orderId}`).subscribe({
      next: (res) => {
        this.orderDetails.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching order details', err);
        this.error.set('Failed to load order details. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}
