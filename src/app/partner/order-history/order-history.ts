import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';

@Component({
  selector: 'app-order-history',
  imports: [FormsModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory {
  constructor(
    private http: HttpClient
  ) { }
  orders: any[] = [];
  isLoading = signal<boolean>(false);
  partnerId: number = 0;
  totalPages: number = 1;
  totalCount: number = 0;
  // Model mapping to your backend OrderHistoryQueryDto
  query = {
    page: 1,
    pageSize: 10,
    status: null as number | null,
    from: null as string | null,
    to: null as string | null,
    search: null as string | null
  };

  ngOnInit() {
    this.partnerId = Number(localStorage.getItem('partnerId'));
    this.loadOrders();
  }

  loadOrders() {
    this.isLoading.set(true);
    let params = new HttpParams()
      .set('page', this.query.page)
      .set('pageSize', this.query.pageSize);

    if (this.query.status != null) {
      params = params.set('status', this.query.status);
    }

    if (this.query.from) {
      params = params.set('from', this.query.from);
    }

    if (this.query.to) {
      params = params.set('to', this.query.to);
    }

    if (this.query.search) {
      params = params.set('search', this.query.search);
    }

    this.http.get<any>(`${environment.apiUrls.partner}/Order/history/${this.partnerId}`, {params}).subscribe({
      next: (res) => {
        this.orders = res.data || [];
        this.totalPages = res.totalPages || 1;
        this.totalCount = res.totalCount || 0;
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading history', err);
        this.isLoading.set(false);
      }
    })
  }

  applyFilters() {
    this.query.page = 1;
    this.loadOrders();
  }

  resetFilters() {
    this.query = { page: 1, pageSize: 10, status: null, from: null, to: null, search: null };
    this.loadOrders();
  }

  changePage(newPage: number) {
    this.query.page = newPage;
    this.loadOrders();
  }
  goBack() {

  }
  getStatusName(status: number) {
    const statusName = OrderStatusEnum[status];
    return statusName ? statusName.replace(/([A-Z])/g, ' $1').trim() : 'Unknown';
  }
}
