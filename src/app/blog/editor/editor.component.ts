import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
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
    published_date: new FormControl(''),
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
          // Format the date as `yyyy-MM-ddThh:mm`
          let publishedDate = draft.published_date?.toDate().toISOString();
          // Remove the Z at the end of the string
          publishedDate = publishedDate?.substring(0, publishedDate.length - 1);
          this.editorForm.patchValue({
            title: draft.title,
            subtitle: draft.subtitle,
            content: draft.content,
            published_date: publishedDate,
          });
          this.formLoaded = true;
        }
      });
    this.editorSubscription = this.editorForm.valueChanges
      .pipe(
        map((value) => {
          let publishedDate = value.published_date
            ? new Date(value.published_date)
            : new Date();
          let publishedTimestamp = new Timestamp(
            publishedDate.getTime() / 1000,
            0
          );
          return {
            title: value.title ?? '',
            subtitle: value.subtitle ?? '',
            content: value.content ?? '',
            published_date: publishedTimestamp,
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

  openDateDialog(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    // Get the input element that triggered the event
    event.target.showPicker();
  }
}
