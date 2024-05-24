import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SellerSignupService } from '../../services/seller-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrl: './seller-signup.component.css'
})
export class SellerSignupComponent implements OnInit{

  public signupMsg: string = ''

  constructor(private fb: FormBuilder, private signupService: SellerSignupService, private router: Router){}

  loginForm = this.fb.group({
    usuario: ['', [Validators.required, Validators.email]],
    contraseña: ['', [Validators.required]]
  })

  registerForm = this.fb.group({
    cedula: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    numero_celular: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  login(){
    let userData = this.loginForm.value
    this.signupService.loginUser(userData).subscribe({
      next: (data:any) => {

        if (data.status) {
          localStorage.setItem("id",data.data.id);
          localStorage.setItem("rol",data.data.rol);
          this.loginForm.reset();
          alert("Bienvenido "+ userData.usuario );
          this.router.navigate(['/']);
        }else{
          alert("Error inesperado, comuniquese con un asesor o intentelo de nuevo mas tarde")
        }
        
        if (!data.status && data.message == "Credenciales invalidas") {
          this.signupMsg = data.message;
          alert(data.message);
        }
        
      },
      error: (err:any) => {
        alert("Error inesperado, comuniquese con un asesor o intentelo de nuevo mas tarde")
        console.log("request error:");
        console.log(err);
      }
    })
    
  }

  register(){
    let userData = this.registerForm.value
    this.signupService.register(userData).subscribe({
      next: (data:any) => {
        if (data) {
          alert("Usuario creado con exito, revise su correo para obtener sus credenciales");
          this.registerForm.reset();
        }

      },
      error: (err:any) => {
        console.log("request error:");
        console.log(err);
      }
    })
  }

  public get loginFormControlls(): any{
    return this.loginForm.controls;
  }

  public get registerFormControlls(): any{
    return this.registerForm.controls;
  }
}
