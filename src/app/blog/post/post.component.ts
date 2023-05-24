import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/blog';
import { fadeInWithDelay } from '../../animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [
    fadeInWithDelay,
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PostComponent {
  @Input() post!: Post;
  @Input() fadeInDelay = 0;
  @Input() collapsible = false;
  isExpanded = false;
  content = '';

  get firstParagraph(): string {
    return this.post.content.split('\n')[0];
  }

  get remainingParagraphs(): string {
    return this.post.content.split('\n').slice(1).join('\n');
  }

  get isShortPost(): boolean {
    return this.post.content.split('\n').length === 1;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
