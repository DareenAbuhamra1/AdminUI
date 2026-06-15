import { HttpClient } from '@angular/common/http';
import { Component, signal, ViewChild } from '@angular/core';
import { productDisplayDto } from '../../shared/models/productDisplayDto';
import { environment } from '../../shared/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductOptions } from '../product-options/product-options';
import { OrderCartDto } from '../../shared/models/orderCartDto';
import { OrderStatusEnum } from '../../shared/enums/OrderStatusEnum';

@Component({
  selector: 'app-products',
  imports: [ProductOptions],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  constructor(
    private http: HttpClient,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar,
    private router: Router
  ){}

  isLoading = signal<boolean>(true);
  products: productDisplayDto[] = [];
  partnerId:number = 0;
  domainId:number = 0;
  selectedProduct :productDisplayDto | null  = null;
  quantity: number = 1;

  @ViewChild(ProductOptions) productOptionsComponent!: ProductOptions;

  ngOnInit(){
    this.route.queryParams.subscribe(
      params =>{
        this.partnerId = Number(params['partnerId']) || 0;
        this.domainId = Number(params['domainId']) || 0;
        this.getProducts();
      }
    )
  }
  getProducts(){
    this.http.get<productDisplayDto[]>(`${environment.apiUrls.customer}/Product/partner/${this.partnerId}/products`)
    .subscribe({
      next:(res)=>{
        this.products = res;
        this.isLoading.set(false);
        console.log(res);
      },
      error: (err) =>{
        if(err.status == 404){
          this.snackBar.open("Products not found", 'Close',{duration:3000});
        }
      }
    })

  }
  selectProduct(p: productDisplayDto){
    this.selectedProduct = p;
    this.quantity = 1; // Reset quantity when a new product is selected
  }
  clearSelection(){
    this.selectedProduct = null;
    this.quantity = 1; // Reset quantity when closing the options view
  }

  increaseQuantity(){
    this.quantity++;
  }

  decreaseQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  AddToCart(){
    if (!this.selectedProduct) return;

    // Retrieve the selected options from the child component
    const selectedOptions = this.productOptionsComponent?.selectedOptions || [];
    const orderLineOptions = selectedOptions.map(opt => ({
      productOptionId: opt.productOptionId,
      quantity: 1 // TODO:Default quantity for options
    }));

    const cartPayload: OrderCartDto = {
      orderId: 0,
      deliveryLocationId: Number(localStorage.getItem("loc")), 
      status: OrderStatusEnum.Pending,
      customerId: Number(localStorage.getItem("customerId")), 
      partnerId: this.partnerId,
      domainId: this.domainId,
      orderLine: {
        productId: this.selectedProduct.id,
        quantity: this.quantity,
        note: "", // You could link this to a textarea in the UI later
        orderLineOptions: orderLineOptions
      }
    };

  
    this.http.post(`${environment.apiUrls.customer}/Order/add-order-cart`, cartPayload).subscribe({
      next: (res) => {
        this.snackBar.open("Item added to cart successfully!", 'Close', {duration: 3000});
        this.clearSelection();
      },
      error: (err) => {
        this.snackBar.open(`Error: ${err.message}`, 'Close', {duration: 3000});
      }
    });
  }

  goToCart(){
    this.router.navigate(['customer/cart']);
  }

  goToTrackOrders() {
    this.router.navigate(['customer/track-orders']);
  }
}
