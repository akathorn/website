import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnDestroy {
  post?: Post;
  postSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postSubscription = this.activatedRoute.params
      .pipe(
        map((params) => params['id']),
        mergeMap((id) => this.postsService.getPost(id)),
        map((post) => {
          if (!post) {
            this.router.navigateByUrl('/404'); // redirect to 404 page
            throw new Error('Post not found');
          }
          return post;
        })
      )
      .subscribe((post) => {
        this.post = post;
      });
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 300);
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
