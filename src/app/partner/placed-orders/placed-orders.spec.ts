import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedOrders } from './placed-orders';

describe('PlacedOrders', () => {
  let component: PlacedOrders;
  let fixture: ComponentFixture<PlacedOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacedOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(PlacedOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
