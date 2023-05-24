import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './login/redirect/redirect.component';
import { NotFoundComponent } from './not-found/not-found.component';

// NOTE: Maximum animationX is 3, if you want to add more animations, you need to add more
// animations in the animations.ts file
const routes: Routes = [
  { path: '', component: MainComponent, data: { animationX: '0' } },
  { path: 'login', component: LoginComponent },
  { path: 'signInWithEmail', component: RedirectComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  // 404
  { path: '**', component: NotFoundComponent, data: { animationX: '3' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
