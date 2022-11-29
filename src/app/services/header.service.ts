import { Injectable } from '@angular/core';
import { headerI } from '../interfaces/header.interface';

@Injectable({
  providedIn: 'root'
})


export class HeaderService {

  constructor() { }

  headerMenu : headerI[]= [
    {
      title : 'New Post',
      ruta : 'post-create'
    },
    {
      title : 'Login',
      ruta : 'login'
    },
    {
      title : 'SignUp',
      ruta :'signup'
    },
    {
      title : 'Logout',
      ruta :'logout'
    }
  ]



}
