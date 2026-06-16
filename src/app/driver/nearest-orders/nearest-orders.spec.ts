import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestOrders } from './nearest-orders';

describe('NearestOrders', () => {
  let component: NearestOrders;
  let fixture: ComponentFixture<NearestOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearestOrders],
    }).compileComponents();

    fixture = TestBed.createComponent(NearestOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
