import { Component, OnInit, inject } from '@angular/core';
import { Cart, PriceSummary } from '../../models/dataTypes';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { CartItemsService } from '../../services/cart-items.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public cart: any[] = []

  public total:any;
  private cartItemService = inject( CartItemsService);

  constructor(private router: Router, private shopService: ShopService){}

  ngOnInit(): void {
    this.loadCardDetails();
    this.calculateTotal();
  }

  loadCardDetails(){
    return this.cart = this.cartItemService.getCartItems();
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id_producto !== productId);
    
    this.cartItemService.setCartItems(this.cart);
    this.calculateTotal();
  }

  calculateTotal() {
    return this.total = this.cart.reduce((acc, item) => acc + (item.product.precio * item.cantidad), 0);
  }

  checkoutOrder(){
    this.router.navigate(['/checkout'])
  }

}
