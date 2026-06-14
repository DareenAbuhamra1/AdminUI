import { HttpClient } from '@angular/common/http';
import { Component, signal, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '../../shared/environments/environment';
import { productOptionDisplayDto } from '../../shared/models/productOptionDisplayDto';
import { productOption } from '../../shared/models/productOptions';

@Component({
  selector: 'app-product-options',
  imports: [],
  templateUrl: './product-options.html',
  styleUrl: './product-options.css',
})
export class ProductOptions implements OnChanges {
  constructor(
    private http: HttpClient,
  ) { }

  isLoading = signal<boolean>(true);
  productOptions: productOptionDisplayDto[] = [];
  selectedOptions: productOption[] = [];

  @Input() productId: number = 0;
  @Input() productName: string = '';
  @Input() basePrice: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId']) {
      this.isLoading.set(true);
      this.http.get<productOptionDisplayDto[]>(`${environment.apiUrls.customer}/Product/${this.productId}/productOptions`).subscribe({
        next: (res) => {
          this.productOptions = res;
          this.isLoading.set(false);
        }
      })
    }
  }
  toggleOption(option: productOption, group: productOptionDisplayDto) {

    const index = this.selectedOptions.findIndex(
      o => o.productOptionId === option.productOptionId
    );

    // remove if already selected
    if (index > -1) {
      this.selectedOptions.splice(index, 1);
      return;
    }

    // Count how many options from this specific group are currently selected
    const selectedCountInGroup = group.options.filter(opt => 
      this.isSelected(opt.productOptionId)
    ).length;

    // prevent exceeding maxSelection
    if (selectedCountInGroup >= group.maxSelection) {
      if (group.maxSelection === 1) {
        // Auto-swap the selection if max is 1 for better UX
        const currentSelectedId = group.options.find(opt => this.isSelected(opt.productOptionId))?.productOptionId;
        this.selectedOptions = this.selectedOptions.filter(o => o.productOptionId !== currentSelectedId);
      } else {
        return; // Reject if user hits the max allowed for checkboxes
      }
    }

    this.selectedOptions.push(option);
  }
  isSelected(id: number): boolean {
    return this.selectedOptions.some(o => o.productOptionId === id);
  }

  get isValid(): boolean {
    if (this.isLoading()) return false;
    if (!this.productOptions || this.productOptions.length === 0) return true;

    for (const group of this.productOptions) {
      const selectedCountInGroup = group.options.filter(opt =>
        this.isSelected(opt.productOptionId)
      ).length;

      // Requirement 1: If it's required, minSelection must be met
      if (group.isRequired && selectedCountInGroup < group.minSelection) {
        return false;
      }
      
      // Requirement 2: If it's optional but they selected something, minSelection still applies
      if (selectedCountInGroup > 0 && selectedCountInGroup < group.minSelection) {
        return false;
      }
    }
    return true;
  }
}
