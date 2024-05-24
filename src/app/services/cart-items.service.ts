import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  private numberItems = signal<Number>(0);

  number : any[] = [];
  private cart = signal<any[]>([])

  setNumberItems(value:number) {
    this.numberItems.set(value);
  }

  getNumberItems() {
    return this.numberItems();
  }
  
  setCartItems(value:any[]) {
    this.cart.set(value);
    localStorage.setItem('cart',JSON.stringify(value));
    this.setNumberItems(this.getCartItems().length)
  }

  getCartItems() {
    return this.cart();
  }
  constructor() {
    let storedCart = localStorage.getItem('cart');
    
    if (storedCart) {
      this.setCartItems(JSON.parse(storedCart));
    }
  }
}
