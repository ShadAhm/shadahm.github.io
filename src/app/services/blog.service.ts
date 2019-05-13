import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

  getBlogPosts(): Observable<any> {
    return this.httpClient.get('assets/data/blog-posts.json')
      .pipe(map(res => res));
  }
}
