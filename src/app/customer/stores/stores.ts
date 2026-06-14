import { Component, signal } from '@angular/core';
import { storesCustomerDto } from '../../shared/models/storesCustomerDto';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stores',
  imports: [],
  templateUrl: './stores.html',
  styleUrl: './stores.css',
})
export class Stores {
  isLoading = signal<boolean>(false);
  stores : storesCustomerDto[] = [];
  domainId:number = 0;

  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    private snackBar:MatSnackBar
  ){}
  ngOnInit(){
    this.route.queryParams.subscribe(params =>{
      this.domainId = params['domainId'];
    })
    this.getStoresForDomain()
  }
  getStoresForDomain(){
    this.isLoading.set(true);
    this.http.get<storesCustomerDto[]>(`${environment.apiUrls.customer}/Partner/${this.domainId}`)
    .subscribe({
      next: (res)=>{
        this.stores = res;
        this.isLoading.set(false);
      },
      error: (err)=>{
        this.isLoading.set(false);
        if(err.status == 404){
          this.snackBar.open("No stores are found", 'Close', { duration: 3000 })
        }
      }
    }
    )
  }
  selectStore(s:number){}
}
