import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
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
  private editorSubscription?: Subscription;

  editorForm = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    content: new FormControl(''),
    // published_date: new FormControl(new Date()),
    // tags: new FormControl([]),
  });
  formLoaded = false;

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
        if (!this.formLoaded) {
          this.editorForm.patchValue({
            ...draft,
          });
          this.formLoaded = true;
        }
      });
    this.editorSubscription = this.editorForm.valueChanges
      .pipe(
        map((value) => {
          return {
            title: value.title ?? '',
            subtitle: value.subtitle ?? '',
            content: value.content ?? '',
          };
        }),
        mergeMap((value) =>
          this.postsService.updateDraft(this.draft!.id, value)
        )
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.draftSubscription?.unsubscribe();
    this.editorSubscription?.unsubscribe();
  }
}
