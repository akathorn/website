import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user$ = this.auth.user$;

  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  emailSent = false;
  sendingEmail = false;

  constructor(private auth: AuthService) {}

  onSubmit() {
    if (this.emailForm.valid) {
      this.sendingEmail = true;
      this.auth.sendSignInEmail(this.emailForm.value.email!).subscribe(() => {
        console.log('Email sent');
        this.sendingEmail = false;
        this.emailSent = true;
      });
    }
  }

  signOut() {
    this.auth.signOut().subscribe(() => {
      console.log('Logged out');
    });
  }
}
