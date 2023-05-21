import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/blog/posts.service';
import { TagsService } from '../services/blog/tags.service';
import { Tag, TagData } from '../models/blog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user$ = this.auth.user$;
  posts$ = this.postsService.posts$;
  drafts$ = this.postsService.drafts$;
  tags$ = this.tagsService.tags$;
  newDraftId = '';

  newTag: Tag = {
    id: '',
    name: '',
    description: '',
  };

  constructor(
    private auth: AuthService,
    private postsService: PostsService,
    private tagsService: TagsService
  ) {}

  signOut() {
    this.auth.signOut().subscribe(() => {
      console.log('Logged out');
    });
  }

  createDraft() {
    if (this.newDraftId === '') {
      console.log('Please enter a draft ID');
      return;
    }
    this.postsService.createDraft(this.newDraftId).subscribe(() => {
      console.log('Draft created');
    });
  }

  createTag() {
    if (this.newTag.id === '') {
      console.log('Please enter a tag ID');
      return;
    }
    // Remove id from tag object
    let tagData: TagData & { id?: string } = { ...this.newTag };
    delete tagData.id;
    this.tagsService.createTag(this.newTag.id, tagData).subscribe(() => {
      console.log('Tag created');
    });
  }

  deleteTag(tagId: string) {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this tag?'
    );
    if (shouldDelete) {
      this.tagsService.deleteTag(tagId).subscribe(() => {
        console.log('Tag deleted');
      });
    }
  }

  deletePost(postId: string) {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (shouldDelete) {
      this.postsService.deletePost(postId).subscribe(() => {
        console.log('Post deleted');
      });
    }
  }
}
