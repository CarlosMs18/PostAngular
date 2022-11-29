import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public signupForm : FormGroup = this.fb.group({
     nombre : ['',[Validators.required, Validators.minLength(3)]],
     email : ['',[Validators.required , Validators.pattern(this.emailPattern)]],
     password : ['',[Validators.required ,Validators.minLength(4)]],
     password2 : ['',Validators.required],
     terminos : [false,Validators.requiredTrue]
  },{
    validators  : this.passwordIguales('password', 'password2')
  })

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router :Router
  ) { }

  ngOnInit(): void {
  }


  validarTerminos(){
    if(this.signupForm.get('terminos')?.invalid && this.signupForm.get('terminos')?.touched){
      return true;
    }else{
      return false
    }
  }

  validarPassword(){
    const pass1 = this.signupForm.get('password')
    const pass2 = this.signupForm.get('password2')

    if(pass1 === pass2){
      return false
    } else{
      return true
    }
  }

  passwordIguales(pass1 : string, pass2 : string){
    return (formGroup : FormGroup) => {
      const password1 = formGroup.get(pass1);
      const password2 = formGroup.get(pass2);

      if(password1?.value === password2?.value){
        password2?.setErrors(null);
      }else{
        password2?.setErrors({noEsIgual : true})
      }
    }

  }

  campoValido(campo : string){
    if(this.signupForm.get(campo)?.invalid){
      return true;
    }else {
      return false;
    }
  }



  signup(){
     if(this.signupForm.invalid){
      return;
     }

     this.authService.signup(this.signupForm.value)
            .subscribe({
              next : resp => {
                console.log(resp)
                this.router.navigateByUrl('/')
              },
              error : (err : HttpErrorResponse) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.msg
                })
              }
            })
  }
}
