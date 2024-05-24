import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellerSignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
