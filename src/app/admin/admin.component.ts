import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  user$: Observable<User | null>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
  }

  signOut() {
    this.auth.signOut().subscribe(() => {
      console.log('Logged out');
    });
  }
}
