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

  getBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>('assets/data/blog-posts.json')
      .pipe(map(res => res));
  }

  getBlogPost(name: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost[]>('assets/data/blog-posts.json')
      .pipe(map(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].name === name) {
            return res[i];
          }
        }
      }));
  }
}
