import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.html',
  styleUrls: ['./track-orders.css']
})
export class TrackOrders implements OnInit {
  isLoading = signal(true);
  orders: any[] = [];

  constructor(
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const customerId = Number(localStorage.getItem("customerId"));
    if (!customerId) {
      this.snackBar.open("Customer not logged in.", "Close", { duration: 3000 });
      this.isLoading.set(false);
      return;
    }

    // TODO: Update this URL if your backend endpoint for fetching all customer orders is different
    this.http.get<any[]>(`${environment.apiUrls.customer}/Order/Orders/${customerId}`).subscribe({
      next: (res: any) => {
        this.orders = res.data || res; // Handles both {data: []} and [] responses
        this.isLoading.set(false);
      },
      error: (err) => {
        this.snackBar.open("Could not fetch orders.", "Close", { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  getStatusName(status: number): string {
    const statusName = OrderStatusEnum[status];
    // Adds a space before capital letters (e.g., "ReadyForPickUp" -> "Ready For Pick Up")
    return statusName ? statusName.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
  }
}