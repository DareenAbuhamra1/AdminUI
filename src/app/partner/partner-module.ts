import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { OrderHistory } from './order-history/order-history';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path:'dashboard',component: Dashboard},
      {path: 'order-history',component:OrderHistory}
    ])
  ],
})
export class PartnerModule {
  
}
