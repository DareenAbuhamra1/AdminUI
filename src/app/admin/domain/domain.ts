import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../shared/environments/environment';

@Component({
  selector: 'app-admin-domain',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './domain.html',
  styleUrl: './domain.css'
})
export class Domain implements OnInit {
  domains: any[] = [];
  partners: any[] = [];
  isLoading = signal<boolean>(true);

  // Form fields
  newDomainName: string = '';
  selectedDomainId: number | null = null;
  partnerIdToAttach: number | null = null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getDomains();
    this.getPartners();
  }

  // 1. Get all domains
  getDomains() {
    this.isLoading.set(true);
    this.http.get<any[]>(`${environment.apiUrls.admin}/Domain/domains`)
      .subscribe({
        next: (res) => {
          this.domains = res;
          this.isLoading.set(false);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.snackBar.open(`Error loading domains: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
  }

  getPartners() {
    
    this.http.get<any[]>(`${environment.apiUrls.admin}/Partner/get-partners`)
      .subscribe({
        next: (res) => {
          this.partners = res;
        },
        error: (err) => {
          this.snackBar.open(`Error loading partners: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
  }

  // 2. Create domain
  createDomain() {
    if (!this.newDomainName) {
      this.snackBar.open('Please enter a domain name', 'Close', { duration: 3000 });
      return;
    }

    const payload = { name: this.newDomainName };
    
    this.http.post(`${environment.apiUrls.admin}/Domain/create-domain`, payload)
      .subscribe({
        next: () => {
          this.snackBar.open('Domain created successfully', 'Close', { duration: 3000 });
          this.newDomainName = '';
          this.getDomains(); // Refresh the domains list
        },
        error: (err) => {
          this.snackBar.open(`Error creating domain: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
  }

  attachPartner() {
    if (!this.selectedDomainId || !this.partnerIdToAttach) {
      this.snackBar.open('Please select a domain and enter a partner ID', 'Close', { duration: 3000 });
      return;
    }

    const payload = { domainId: this.selectedDomainId, partnerId: this.partnerIdToAttach };
    

    this.http.post(`${environment.apiUrls.admin}/Domain/attach-partner-domain`, payload)
      .subscribe({
        next: () => {
          this.snackBar.open('Partner attached successfully', 'Close', { duration: 3000 });
          this.selectedDomainId = null;
          this.partnerIdToAttach = null;
        },
        error: (err) => {
          this.snackBar.open(`Error attaching partner: ${err.message}`, 'Close', { duration: 3000 });
        }
      });
  }
}