import { Component, signal, Output, EventEmitter } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';

@Component({
  selector: 'app-preparing-orders',
  imports: [],
  templateUrl: './preparing-orders.html',
  styleUrl: './preparing-orders.css',
})
export class PreparingOrders {
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
    this.http.get<any[]>(`${environment.apiUrls.partner}/Order/get-all-orders/partner/${this.partnerId}`).subscribe({
      next: (res: any) => {
        this.orders = res.data || res || [];
        this.isLoading.set(false);
      },
    });
  }

  getStatusName(status: number): string {
      const statusName = OrderStatusEnum[status];
      return statusName ? statusName.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
  }
  setReadyForPickUp(orderId : number){
    this.isLoading.set(true);
    this.http.patch(`${environment.apiUrls.partner}/Order/${orderId}/partner/${this.partnerId}/ready-for-pickup`,null).subscribe({
      next: (res)=>{
        this.snackBar.open("Order is ready for pickup!", "Close", { duration: 3000 });
        this.orders = this.orders.filter(o => o.orderId !== orderId);
        this.isLoading.set(false);
        this.orderChanged.emit();
      }
    })
  }
}
