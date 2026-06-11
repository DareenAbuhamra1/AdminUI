import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCustomer } from './location-customer';

describe('LocationCustomer', () => {
  let component: LocationCustomer;
  let fixture: ComponentFixture<LocationCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationCustomer],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationCustomer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
