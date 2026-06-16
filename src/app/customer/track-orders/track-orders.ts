import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';
import { DatePipe } from '@angular/common';
import { OrderDetails } from '../../shared/order-details/order-details';

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.html',
  styleUrls: ['./track-orders.css'],
  imports: [ DatePipe, OrderDetails]
})
export class TrackOrders implements OnInit {
  isLoading = signal(true);
  orders: any[] = [];
  groupedOrders: { statusName: string, status: number, orders: any[] }[] = [];
  OrderStatusEnum = OrderStatusEnum;
  expandedOrderId: number | null = null;

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

    this.http.get<any[]>(`${environment.apiUrls.customer}/Order/Orders/${customerId}`).subscribe({
      next: (res: any) => {
        this.orders = res.data || res || []; 
        this.groupOrders();
        this.isLoading.set(false);
      },
      error: (err) => {
        this.snackBar.open("Could not fetch orders.", "Close", { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  groupOrders() {
    const groups = new Map<number, any[]>();
    for (const order of this.orders) {
      if (!groups.has(order.status)) {
        groups.set(order.status, []);
      }
      groups.get(order.status)!.push(order);
    }
    this.groupedOrders = Array.from(groups.entries()).map(([status, orders]) => ({
      status,
      statusName: this.formatStatusName(orders[0].orderStatus),
      orders
    })).sort((a, b) => a.status - b.status);
  }

  isCanceled(orderStatus: string): boolean {
    return orderStatus?.toLowerCase().includes('cancel') || false;
  }

  formatStatusName(statusName: string): string {
    // Adds a space before capital letters (e.g., "ReadyForPickUp" -> "Ready For Pick Up")
    return statusName ? statusName.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
  }

  combineUtcDate(dateStr: string, timeStr: string): string {
    if (!dateStr || !timeStr) return '';
    return `${dateStr}T${timeStr}Z`;
  }

  toggleDetails(orderId: number): void {
    this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
  }
}