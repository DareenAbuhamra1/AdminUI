import { HttpClient } from '@angular/common/http';
import { Component, signal, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../shared/environments/environment';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';

@Component({
  selector: 'app-placed-orders',
  imports: [],
  templateUrl: './placed-orders.html',
  styleUrl: './placed-orders.css',
})
export class PlacedOrders {
  isLoading = signal<boolean>(true);
  orders: any[] = [];
  partnerId: number = 0;

  @Output() orderChanged = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.partnerId = Number(localStorage.getItem('partnerId'));
    if (this.partnerId) {
      this.fetchOrders();
    } else {
      this.snackBar.open("Partner ID not found. Please log in.", "Close", { duration: 3000 });
      this.isLoading.set(false);
    }
  }

  fetchOrders() {
    this.isLoading.set(true);
    this.http.get<any[]>(`${environment.apiUrls.partner}/Order/receive-order/partner/${this.partnerId}`).subscribe({
      next: (res: any) => {
        this.orders = res.data || res || [];
        this.isLoading.set(false);
      },
      error: (err) => {
        this.snackBar.open("Failed to fetch orders", "Close", { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }


  acceptOrder(orderId: number) {
    this.http.patch(`${environment.apiUrls.partner}/Order/${orderId}/partner/${this.partnerId}/accept`,null).subscribe({
      next: (res) =>{
        this.snackBar.open("Order accepted successfully", "Close", { duration: 3000 });
        this.orders = this.orders.filter(o => o.orderId !== orderId);
        this.orderChanged.emit();
      }
    })
  }

  declineOrder(orderId: number) {
    if (confirm("Are you sure you want to decline this order?")) {
      this.http.patch(`${environment.apiUrls.partner}/Order/${orderId}/partner/${this.partnerId}/decline`,null).subscribe({
      next: (res) =>{
        this.snackBar.open("Order declined", "Close", { duration: 3000 });
        this.orders = this.orders.filter(o => o.orderId !== orderId);
        this.orderChanged.emit();
      }
    })
    }
  }

  getStatusName(status: number): string {
    const statusName = OrderStatusEnum[status];
    return statusName ? statusName.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
  }
}
