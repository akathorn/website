import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Components
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './login/redirect/redirect.component';

@NgModule({
  declarations: [LoginComponent, RedirectComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    // Material,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AuthModule {}
