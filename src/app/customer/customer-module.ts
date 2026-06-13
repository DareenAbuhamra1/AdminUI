import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Domains } from './domains/domains';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth-service/auth-interceptor';
import { Stores } from './stores/stores';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'domains',component: Domains},
      {path:'stores',component:Stores},
      //{path:'store'},
    ]),
  ],
})
export class CustomerModule {}
