import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css'
})
export class ProductUpdateComponent implements OnInit{

  public productMsg: string | undefined
  public productId: any;
  public product: any;

  constructor(private fb: FormBuilder, private productService: ProductsService, private router: Router, 
    private route: ActivatedRoute){}

  productUpdateForm = this.fb.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    tipo_producto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    cantidad_disponible: ['', [Validators.required]],
    img: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product = JSON.parse(decodeURIComponent(params['data']));
    });
    this.productUpdateForm.reset({ id:this.product.id_producto, nombre: this.product.nombre, tipo_producto:this.product.tipo_producto,precio:this.product.precio, cantidad_disponible: this.product.cantidad_disponible,img: this.product.img });
  }

  updateProduct(){
    /* let productData = this.productUpdateForm.value as Product
    if(this.productId){
      productData._id = this.productId
    }  
    this.productService.updateProduct(productData).subscribe((res)=>{
      if(res){
        this.productMsg = 'Product Has Been Successfully Updated'
      } 
      this.getTimeout('suc')
    }, (err)=>{
      if(err){
        this.productMsg = err.statusText
      }
      this.getTimeout('err')
    }) */
  }

  getTimeout(val: string){
    if(val==='suc'){
      setTimeout(() => {
        this.productMsg = undefined
        this.router.navigate(['/products'])
      }, 2500);
    }else{
      setTimeout(() => {
        this.productMsg = undefined
      }, 4000);
    }
  }
}
