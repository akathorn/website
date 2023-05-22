import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, of } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnDestroy {
  posts$: Observable<Post[]> = of([]);

  private routeSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: PostsService
  ) {
    // Get posts filtering by tag
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      let tag = params['tag'];
      this.posts$ = this.blogService.posts$.pipe(
        map((posts) => {
          return posts.filter((post) => {
            return post.tags.includes(tag) || tag === undefined;
          });
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
