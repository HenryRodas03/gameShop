import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ShopService } from '../../services/shop.service';
import { CartItemsService } from '../../services/cart-items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  public shopProducts: any;
  cart: any[] = [];
  private cartItemService = inject( CartItemsService);
  rol:any;

  constructor(private shopService: ShopService, private router: Router){}

  async ngOnInit() {
    this.rol = localStorage.getItem("rol");
    this.cart = this.cartItemService.getCartItems();

    await this.getProducts();
  } 

  getProducts(){
    this.shopService.getProducts().subscribe({
      next: (data:any) => {
        
        if (data.status) {
          this.shopProducts = data.data
        }else{
          alert("Error inesperado, comuniquese con un asesor o intentelo de nuevo mas tarde")
        }
        
      },
      error: (err:any) => {
        alert("Error inesperado, comuniquese con un asesor o intentelo de nuevo mas tarde")
        console.log("request error:");
        console.log(err);
      }
    });
  }

  addCart(product: any, cantidad: string, inputRef: HTMLInputElement) {
    const cantidadNumerica = parseInt(cantidad);
    if (cantidadNumerica > 0) {
      const existingProductIndex = this.cart.findIndex(p => p.product.id_producto === product.id_producto);
      console.log("🚀 ~ ShopComponent ~ addCart ~ existingProductIndex:", existingProductIndex)

      if (existingProductIndex > -1) {
        this.cart[existingProductIndex].cantidad += cantidadNumerica;
        console.log("🚀 ~ ShopComponent ~ addCart ~ this.cart:", this.cart)
      } else {
        this.cart.push({ product, cantidad: cantidadNumerica });
        console.log("🚀 ~ ShopComponent ~ addCart ~ this.cart:", this.cart)
      }

      this.saveCart();
      inputRef.value = ''; 
    } else {
      alert("La cantidad debe ser mayor que cero");
    }
  }

  saveCart(){
    this.cartItemService.setCartItems(this.cart);
  }
  sendData(productData:any) {
    this.router.navigate(['/products/update', { data: encodeURIComponent(JSON.stringify(productData)) }]);
  }

}
