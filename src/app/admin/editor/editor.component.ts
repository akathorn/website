import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, map, mergeMap } from 'rxjs';
import { Post } from 'src/app/models/blog';
import { ImageService } from '../services/image.service';
import { PostsService } from 'src/app/blog/services/posts.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnDestroy, OnInit {
  draft?: Post;
  private draftSubscription?: Subscription;
  private editorSubscription?: Subscription;

  tags: string[] = [];

  editorForm = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    content: new FormControl(''),
    published_date: new FormControl(''),
  });
  formLoaded = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.subscribeGetDraft();
    this.subscribeToEditorForm();
  }

  private subscribeGetDraft() {
    // Loads the draft from the database, and sets the form values to the draft's values if the form
    // hasn't been loaded yet
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
          // If it's the first time, we load the data to the form
          this.loadDraftToForm(draft);
        }
      });
  }

  private loadDraftToForm(draft: Post) {
    // Loads the draft to the form
    // Format the date as `yyyy-MM-ddThh:mmZ`
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
    this.tags = draft.tags;
  }

  private subscribeToEditorForm() {
    // Subscribes to changes on the editor form, and updates the draft in the database
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

  tagsChange(tags: string[]): void {
    this.tags = tags;
    this.postsService.updateDraft(this.draft!.id, { tags }).subscribe();
  }

  openDateDialog(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    event.target.showPicker();
  }

  deleteDraft(): void {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (shouldDelete) {
      this.postsService
        .deleteDraft(this.draft!.id)
        .subscribe(() => this.router.navigate(['/admin']));
    }
  }

  publishDraft() {
    const shouldPublish = window.confirm(
      'Are you sure you want to publish this post?'
    );
    if (shouldPublish) {
      this.postsService
        .publishDraft(this.draft!.id)
        .subscribe(() => window.alert('Post published!'));
    }
  }

  imageUploaded(url: string): void {
    this.postsService
      .updateDraft(this.draft!.id, { image: { url } })
      .subscribe();
  }

  deletePostImage(): void {
    this.imageService.deletePostImage(this.draft!.id).subscribe(() => {
      this.postsService.deleteFields(this.draft!.id, ['image']);
    });
  }
}
