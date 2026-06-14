import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Domains } from './domains/domains';
import { Stores } from './stores/stores';
import { Products } from './products/products';
import { ProductOptions } from './product-options/product-options';
import { Cart } from './cart/cart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'domains',component: Domains},
      {path:'stores',component:Stores},
      {path:'products', component:Products},
      {path:'product-options',component:ProductOptions},
      {path: 'cart' ,component: Cart}
    ]),
  ],
})
export class CustomerModule {}
