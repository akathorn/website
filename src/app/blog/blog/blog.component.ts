import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map, of } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/blog/services/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnDestroy {
  posts$ = of<Post[]>([]);
  routeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostsService,
    private router: Router // add Router to the constructor
  ) {
    this.routeSubscription = this.activatedRoute.params.subscribe((params) => {
      let tag = params['tag'];
      this.posts$ = this.postService.posts$.pipe(
        map((posts) => {
          let filteredPosts = posts.filter((post) => {
            return post.tags.includes(tag) || tag === undefined;
          });
          if (filteredPosts.length === 0) {
            this.router.navigateByUrl('/404'); // redirect to 404 page
          }
          return filteredPosts;
        })
      );
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
