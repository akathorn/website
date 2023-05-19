import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { RedirectComponent } from './admin/login/redirect/redirect.component';
import { BlogComponent } from './blog/blog/blog.component';
import { EditorComponent } from './blog/editor/editor.component';
import { PostViewComponent } from './blog/post-view/post-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: { animation: 'main' },
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: { animation: 'blog' },
  },
  {
    path: 'blog/post/:id',
    component: PostViewComponent,
    data: { animation: 'postView' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'login' },
  },
  {
    path: 'signInWithEmail',
    component: RedirectComponent,
    data: { animation: 'signInWithEmail' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { animation: 'admin' },
  },
  {
    path: 'admin/draft/:id',
    component: EditorComponent,
    data: { animation: 'editor' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
