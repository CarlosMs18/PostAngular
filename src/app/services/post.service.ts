import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private base_url = environment.base_url;
  constructor(private http : HttpClient) { }


  verPosts(){
    return this.http.get(`${this.base_url}/post`)
  }
}
