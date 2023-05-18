import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss'],
})
export class PostViewComponent implements OnInit, OnDestroy {
  post?: Post;

  private postSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => this.postsService.getPost(params['id'])),
        map((post) => {
          if (post === undefined) {
            // TODO: Redirect to 404 page
            throw new Error('Draft not found');
          }
          return post;
        })
      )
      .subscribe((post) => {
        this.post = post;
      });
  }

  ngOnDestroy(): void {
    this.postSubscription?.unsubscribe();
  }
}
