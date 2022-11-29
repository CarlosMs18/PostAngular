import  Swal  from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public loginForm : FormGroup = this.fb.group({
    email : ['',Validators.required],
    password : ['',Validators.required],
    recordar : ['']
  })
  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.loginForm.setValue({
      email : localStorage.getItem('email'),
      password : '',
      recordar : ''
    })
  }
  campoValido(campo : string){
    if(this.loginForm.get(campo)?.invalid){
      return true;
    }else {
      return false;
    }
  }

  login(){
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value)
          .subscribe({
              next : resp => {
                if(this.loginForm.get('recordar')?.value){
                  localStorage.setItem('email',this.loginForm.get('email').value)
                }else{
                  localStorage.removeItem('email')
                }
                this.router.navigateByUrl('/')
              },
              error : (err : HttpErrorResponse)=> {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: err.error.msg
                })
              }
          })
  }
}
