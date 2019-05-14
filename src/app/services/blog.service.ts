import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

  getBlogPosts(): Observable<any> {
    return this.httpClient.get('assets/data/blog-posts.json')
      .pipe(map(res => res));
  }

  getBlogPost(name : string): Observable<any> {
    return this.httpClient.get('assets/data/blog-posts.json')
      .pipe(map(res => {
        let o = res as BlogPost[]; 

        for (let index = 0; index < o.length; index++) {
          if(o[index].fileName === name + '.md') {
            return o[index]; 
          }
        }
      }));
  }
}
