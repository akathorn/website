import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent {
  user$: Observable<User | null>;

  constructor(auth: AuthService, router: Router) {
    this.user$ = auth.user$;
    auth.signInWithEmailLink().subscribe(() => {
      console.log('Signed in');
      router.navigate(['/admin']);
    });
  }
}
