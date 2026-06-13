import { Component, OnInit } from '@angular/core';
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
    private snackBar:MatSnackBar,
  ){}
  
  domains : domainInfoDto[] = [];
  isLoading: boolean = true;

  ngOnInit(){
    this.getDomains();
  }
  getDomains(){
    debugger
    this.isLoading = true;
    this.http.get<domainInfoDto[]>(`${environment.apiUrls.customer}/Domain/domains`).subscribe({
      next : (res)=>{
        this.domains = res;
        this.isLoading = false;
      },
      error: (err)=>{
        this.isLoading = false;
        if(err.status == 404){
          this.snackBar.open("Domains not found", 'Close',{duration:3000});
        }
      }
    })
  }
  selectDomain(d:number){
    
  }
}
