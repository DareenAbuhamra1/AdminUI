import { Component, OnInit, signal, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';
import { DecimalPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NearestOrderDto {
  area: string;
  city: number;
  country: number;
  deliveryFees: number;
  distanceInKm: number;
  id: number;
  latitude: number;
  longitude: number;
  partnerId: number;
  partnerName: string;
  status: number;
  street: string;
  subTotal: number;
  totalPayment: number;
}

@Component({
  selector: 'app-nearest-orders',
  imports: [DecimalPipe],
  templateUrl: './nearest-orders.html',
  styleUrl: './nearest-orders.css',
})
export class NearestOrders implements OnInit {
  driverId: number = 0;
  nearestOrders: NearestOrderDto[] = [];
  isLoading = signal<boolean>(false);

  @Input() hasAssignedOrder: boolean = true;

  @Output() orderAccepted = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.driverId = Number(localStorage.getItem('driverId'));
    if (this.driverId) {
      this.getNearestOrders();
    }
  }

  getNearestOrders(): void {
    this.isLoading.set(true);
    this.http.get<NearestOrderDto[]>(`${environment.apiUrls.driver}/Order/receive-order/driver/${this.driverId}`).subscribe({
      next: (res) => {
        this.nearestOrders = res || [];
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching nearest orders', err);
        this.isLoading.set(false);
      }
    });
  }

  acceptOrder(orderId: number): void {
    if (this.hasAssignedOrder) return;
    
    this.isLoading.set(true);
    this.http.patch<boolean>(`${environment.apiUrls.driver}/Order/${orderId}/accept/${this.driverId}`,null).subscribe({
      next: (res) =>{
        if(res === true){
          this.isLoading.set(false);
          this.snackBar.open("Order accepted successfully", "Close", { duration: 3000 });
          this.orderAccepted.emit();
          this.getNearestOrders(); // Refresh the nearest orders list
        }else{
          this.isLoading.set(false);
          this.snackBar.open("Couldn't accept order. It may have been assigned to someone else.", "Close", { duration: 3000 });
        }
      },
      error: (err) => {
        console.error("Error accepting order", err);
        this.isLoading.set(false);
        this.snackBar.open("An error occurred while accepting the order.", "Close", { duration: 3000 });
      }
    })
  }
}
