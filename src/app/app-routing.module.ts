import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RedirectComponent } from './admin/login/redirect/redirect.component';
import { BlogComponent } from './blog/blog/blog.component';
import { EditorComponent } from './admin/editor/editor.component';
import { PostViewComponent } from './blog/post-view/post-view.component';

import { AuthGuard, hasCustomClaim } from '@angular/fire/auth-guard';
import { NotFoundComponent } from './not-found/not-found.component'

const adminOnly = () => hasCustomClaim('admin');

// NOTE: Maximum animationX is 3, if you want to add more animations, you need to add more
// animations in the animations.ts file
const routes: Routes = [
  { path: '', component: MainComponent, data: { animationX: '0' } },
  {
    path: 'blog/post/:id',
    component: PostViewComponent,
    data: { animationX: 3 },
  },
  { path: 'blog/:tag', component: BlogComponent, data: { animationX: '2' } },
  { path: 'blog', component: BlogComponent, data: { animationX: '1' } },
  { path: 'login', component: LoginComponent },
  { path: 'signInWithEmail', component: RedirectComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: adminOnly, animationX: '1' },
  },
  {
    path: 'admin/draft/:id',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: adminOnly, animationX: '2' },
  },
  { path: '**', component: NotFoundComponent, data: { animationX: '3' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
