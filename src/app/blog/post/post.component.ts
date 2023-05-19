import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/blog';
import { fadeInWithDelay } from '../../animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [fadeInWithDelay],
})
export class PostComponent {
  @Input() post!: Post;
  @Input() fadeInDelay = 500;
}
