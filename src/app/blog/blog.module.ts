import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';

// Angular Material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Other
import { MarkdownModule } from 'ngx-markdown';

// Components
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { PostViewComponent } from './post-view/post-view.component';

@NgModule({
  declarations: [BlogComponent, PostComponent, PostViewComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    // Material,
    MatIconModule,
    MatButtonModule,
    // Other
    MarkdownModule.forRoot(),
  ],
  exports: [PostComponent],
})
export class BlogModule {}
