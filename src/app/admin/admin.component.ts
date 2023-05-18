import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/blog/posts.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user$ = this.auth.user$;
  posts$ = this.postsService.posts$;
  drafts$ = this.postsService.drafts$;
  newDraftId = '';

  constructor(private auth: AuthService, private postsService: PostsService) {}

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
}
