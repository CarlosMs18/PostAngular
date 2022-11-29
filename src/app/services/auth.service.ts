import { loginFormI } from './../interfaces/loginForm.interface';
import { usuarioResponseI } from './../interfaces/usuarioResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs';
import { environment } from 'src/environments/environment';
import { signupFormI } from '../interfaces/signupForm.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base_url = environment.base_url;
  constructor(private http : HttpClient) { }




  guardarTokenLocalStorage(token : string){
    localStorage.setItem('token',token);
  }

  signup(data : signupFormI){
    return this.http.post<{ok :boolean, user : usuarioResponseI, token : string }>(`${this.base_url}/auth/signup`,data)
           .pipe(
            tap(resp => {

               this.guardarTokenLocalStorage(resp.token)
            })
           )
  }

  login(data : loginFormI){
    return this.http.post<{ok :boolean, user : usuarioResponseI, token : string }>(`${this.base_url}/auth/login`,data)
           .pipe(
            tap(resp => {
              this.guardarTokenLocalStorage(resp.token)
            })
           )
  }
}
