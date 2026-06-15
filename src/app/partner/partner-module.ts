import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { OrderHistory } from './order-history/order-history';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'dashboard',component: Dashboard},
      {path: 'order-history',component:OrderHistory}
    ])
  ],
})
export class PartnerModule {
  
}
