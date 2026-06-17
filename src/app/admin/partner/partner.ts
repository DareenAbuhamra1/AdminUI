import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../shared/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partner.html',
  styleUrl: './partner.css',
})
export class Partner implements OnInit {
  // Use a static variable to cache data across component loads without needing a service
  static cachedPartners: any[] | null = null;

  partners: any[] = [];
  isLoading = signal<boolean>(true);
  
  // Matches the fields requested by your PartnerRegisterDto
  newPartner: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 0,
    dateOfBirth: '',
    name: '',
    registrationNo: '',
    commissionRate: null,
    parentStoreId: null,
    deliveryRuleId: null,
    country: 1, // Jordan
    city: 1,    // Amman
    area: '',
    street: '',
    latitude: null,
    longitude: null
  };

  selectedPartnerId: any = null;
  selectedFile: File | null = null;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(forceRefresh = false): void {
    this.isLoading.set(true);
    // If we already have data and aren't forcing a refresh, use the cached data
    if (!forceRefresh && Partner.cachedPartners) {
      this.partners = Partner.cachedPartners;
      this.isLoading.set(false);
      return;
    }

    this.http.get<any[]>(`${environment.apiUrls.admin}/Partner/get-partners`).subscribe({
      next: (data) => {
        this.partners = data;
        Partner.cachedPartners = data; // Save to cache
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.partners = []; // Ensure partners list is empty on error
        Partner.cachedPartners = null; // Clear cache on error
        this.snackBar.open(`Error loading partners: ${err.message}`, 'Close', {
          duration: 3000,
        });
      }
    });
  }

  createPartner(): void {
    const payload = { 
      ...this.newPartner,
      commissionRate: this.newPartner.commissionRate ?? 0,
      country: this.newPartner.country ?? 0,
      city: this.newPartner.city ?? 0,
      latitude: this.newPartner.latitude ?? 0,
      longitude: this.newPartner.longitude ?? 0,
    };

    this.http.post(`${environment.apiUrls.admin}/Account/create-partner`, payload).subscribe({
      next: () => {
        this.snackBar.open('Partner created successfully', 'Close', { duration: 3000 });
        this.loadPartners(true); // Force refresh to fetch the newly created partner
      },
      error: (err) => this.snackBar.open(`Error creating partner: ${err.message}`, 'Close', { duration: 3000 })
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  uploadMenu(): void {
    if (!this.selectedPartnerId || !this.selectedFile) {
      this.snackBar.open('Please select a partner and an Excel file', 'Close', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${environment.apiUrls.admin}/Product/upload-menu/${this.selectedPartnerId}`, formData).subscribe({
      next: () => this.snackBar.open('Menu uploaded successfully', 'Close', { duration: 3000 }),
      error: (err) => this.snackBar.open(`Error uploading menu: ${err.message}`, 'Close', { duration: 3000 })
    });
  }
}
