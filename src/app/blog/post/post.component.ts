import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/blog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('{{ time }}ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PostComponent {
  @Input() post!: Post;
  @Input() fadeInTime = 500;
}
