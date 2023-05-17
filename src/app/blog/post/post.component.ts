import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/blog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post!: Post;

  // getDate() {
  //   return new Date(this.post.published_date);
  // }
}