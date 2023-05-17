import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, mergeMap } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnDestroy, OnInit {
  draft?: Post;

  private draftSubscription?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.draftSubscription = this.activatedRoute.params
      .pipe(
        mergeMap((params) => this.postsService.getDraft(params['id'])),
        map((draft) => {
          if (draft === undefined) {
            throw new Error('Draft not found');
          }
          return draft;
        })
      )
      .subscribe((draft) => {
        this.draft = draft;
      });
  }

  ngOnDestroy(): void {
    this.draftSubscription?.unsubscribe();
  }
}
