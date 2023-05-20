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
  { path: '', component: MainComponent },
  { path: 'blog/post/:id', component: PostViewComponent },
  { path: 'blog/:tag', component: BlogComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signInWithEmail', component: RedirectComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/draft/:id', component: EditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
