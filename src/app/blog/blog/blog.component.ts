import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
  posts$: Observable<Post[]>;

  constructor(private blogService: PostsService) {
    this.posts$ = this.blogService.posts$;
  }
}
