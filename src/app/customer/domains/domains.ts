import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domainInfoDto } from '../../shared/models/domainInfoDto';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domains',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domains.html',
  styleUrl: './domains.css',
})

export class Domains implements OnInit{
  
  constructor(
    private http:HttpClient,
    private snackBar:MatSnackBar
  ){}
  
  domains = signal<domainInfoDto[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(){
    this.getDomains();
  }
  getDomains(){
    this.http.get<domainInfoDto[]>(`${environment.apiUrls.customer}/Domain/domains`)
    .subscribe({
      next : (res)=>{
        this.domains.set(res);
        this.isLoading.set(false);
      },
      error: (err)=>{
        this.isLoading.set(false);
        if(err.status == 404){
          this.snackBar.open("Domains not found", 'Close',{duration:3000});
        } else {
          this.snackBar.open(`Error: ${err.message}`, 'Close',{duration:3000});
        }
      }
    })
  }
  selectDomain(d:number){
    console.log(d);
  }
}
