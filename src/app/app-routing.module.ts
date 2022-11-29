import { PagesRoutingModule } from './pages/pages.routes';
import { AuthRoutingModule } from './auth/auth.routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path : '',redirectTo : '/post-list' , pathMatch : 'full'
  },
  {
    path : '**', redirectTo : 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
