import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { TagsService } from 'src/app/services/blog/tags.service';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss'],
})
export class TagSelectorComponent implements OnDestroy {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @Input() tags: string[] = [];
  @Output() tagsChange = new EventEmitter<string[]>();

  allTags: string[] = [];
  private tagsSubscription: Subscription;

  constructor(private tagsService: TagsService) {
    this.tagsSubscription = this.tagsService.tags$.subscribe((tags) => {
      this.allTags = tags.map((tag) => tag.id);
    });
  }

  ngOnDestroy() {
    this.tagsSubscription.unsubscribe();
  }

  chipChanged(tag: string, event: any) {
    let chipEvent = event as MatChipSelectionChange;
    if (!chipEvent.isUserInput) {
      return;
    }
    if (chipEvent.selected) {
      this.tags.push(tag);
    } else {
      const index = this.tags.indexOf(tag);
      if (index >= 0) {
        this.tags.splice(index, 1);
      }
    }
    this.tagsChange.emit(this.tags);
  }
}
