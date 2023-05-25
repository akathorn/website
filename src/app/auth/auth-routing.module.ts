import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './login/redirect/redirect.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signInWithEmail', component: RedirectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
