import { PostListComponent } from './/post-list/post-list.component';
import { PostCreateComponent } from './/post-create/post-create.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    CommonModule
  ],
  exports :[
    PostCreateComponent,
    PostListComponent

  ]
})
export class PagesModule { }
