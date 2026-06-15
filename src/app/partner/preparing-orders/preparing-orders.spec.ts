import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparingOrders } from './preparing-orders';

describe('PreparingOrders', () => {
  let component: PreparingOrders;
  let fixture: ComponentFixture<PreparingOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreparingOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(PreparingOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
