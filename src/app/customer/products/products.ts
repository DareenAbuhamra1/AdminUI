import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { productDisplayDto } from '../../shared/models/productDisplayDto';
import { environment } from '../../shared/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  imports: [],
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

  ngOnInit(){
    this.route.queryParams.subscribe(
      params =>{
        this.partnerId = params['partnerId'];
      }
    )
    this.getProducts();
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
  selectProduct(p:number){
    this.router.navigate(['customer/product-options'],{queryParams:{productId:p}});
  }
}
