import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/models/blog';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  post: BlogPost;
  name: string;

  constructor(private activatedRoute : ActivatedRoute, private blogService : BlogService) { }

  ngOnInit() {
    this.post = new BlogPost();

    this.activatedRoute.paramMap.subscribe(params => {
      this.name = params.get("name");

      this.blogService.getBlogPost(this.name).subscribe(resData => this.post = resData); 
    })
  }
}
