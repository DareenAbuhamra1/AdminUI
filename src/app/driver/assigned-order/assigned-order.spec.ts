import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedOrder } from './assigned-order';

describe('AssignedOrder', () => {
  let component: AssignedOrder;
  let fixture: ComponentFixture<AssignedOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignedOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
