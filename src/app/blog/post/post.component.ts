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
  @Input() fadeInDelay = 0;
  @Input() collapsible = false;
  @Input() collapseThreshold = 300;
  isExpanded = false;

  get firstFragment(): string {
    // Get first characters of first fragment
    let fragment = this.post.content.slice(0, this.collapseThreshold);
    if (fragment.length === this.collapseThreshold) {
      fragment += '...';
    }
    return fragment;
  }

  get isShortPost(): boolean {
    return this.post.content.length < this.collapseThreshold;
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}
