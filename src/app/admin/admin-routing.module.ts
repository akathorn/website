import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditorComponent } from './editor/editor.component';

import { AuthGuard, hasCustomClaim } from '@angular/fire/auth-guard';
const adminOnly = () => hasCustomClaim('admin');

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: adminOnly, animationX: '1' },
  },
  {
    path: 'draft/:id',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: adminOnly, animationX: '2' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
