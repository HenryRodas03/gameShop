import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SellerSignupService } from '../services/seller-signup.service';
import { CustomerSignupService } from '../services/customer-signup.service';
import { ShopService } from '../services/shop.service';
import { Product } from '../models/dataTypes';
import { CartItemsService } from '../services/cart-items.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit{

  public menuType: string = 'default';
  public userName: string = ''
  public isHidden: boolean = false
  public searchResults: undefined | Product[] 
  public cartCount: number = 0;
  private cartItemService = inject( CartItemsService);

  constructor(private router: Router,private shopService: ShopService){}

  ngOnInit(): void {
    this.cartCount = this.cartItemService.getCartItems().length;
  }

  logout(){
    localStorage.removeItem("id");
    localStorage.removeItem("rol");
    this.cartItemService.setCartItems([]);
    alert("sesion cerrada correctamente")
  }

  getNumberItems() {
    return this.cartItemService.getNumberItems();
  }


}
