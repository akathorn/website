import { NgModule } from '@angular/core';
import { PostViewComponent } from './post-view/post-view.component';
import { BlogComponent } from './blog/blog.component';
import { RouterModule, Routes } from '@angular/router';

// NOTE: Maximum animationX is 3, if you want to add more animations, you need to add more
// animations in the animations.ts file
const routes: Routes = [
  {
    path: 'post/:id',
    component: PostViewComponent,
    data: { animationX: 3 },
  },
  { path: ':tag', component: BlogComponent, data: { animationX: '2' } },
  { path: '', component: BlogComponent, data: { animationX: '1' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
