import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  emailSent = false;

  constructor(private auth: AuthService) {}

  onSubmit() {
    if (this.emailForm.valid) {
      this.auth.sendSignInEmail(this.emailForm.value.email!).subscribe(() => {
        console.log('Email sent');
        this.emailSent = true;
      });
    }
  }
}
