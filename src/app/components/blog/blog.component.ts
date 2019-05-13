import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BlogPost } from 'src/app/models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: BlogPost[];

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getPosts(); 
  }

  getPosts(): void {
    this.blogService.getBlogPosts().subscribe(
      (response: BlogPost[]) => { this.posts = response },
      (error) => { console.error("Error happened", error) }
    );;
  }
}
