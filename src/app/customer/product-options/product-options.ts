import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../shared/environments/environment';
import { productOptionDisplayDto } from '../../shared/models/productOptionDisplayDto';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-product-options',
  imports: [JsonPipe],
  templateUrl: './product-options.html',
  styleUrl: './product-options.css',
})
export class ProductOptions {
  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
  ){}

  isLoading = signal<boolean>(true);
  productId:number = 0;
  productOptions:productOptionDisplayDto[] = [];

  ngOnInit(){
    this.route.queryParams.subscribe(
      params =>{
        this.productId = params['productId'];
      }
    )
    this.getProductOptions();
  }

  getProductOptions(){
    this.http.get<productOptionDisplayDto[]>(`${environment.apiUrls.customer}/Product/${this.productId}/productOptions`).subscribe({
      next: (res) =>{
        this.productOptions = res;
        this.isLoading.set(false);
      }
    })
  }
}
