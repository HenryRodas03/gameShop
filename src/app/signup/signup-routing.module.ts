import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {path: 'seller-signup', component: SellerSignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
