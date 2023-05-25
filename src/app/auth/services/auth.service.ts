import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  UserCredential,
  idToken,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  user,
} from '@angular/fire/auth';
import {
  Observable,
  OperatorFunction,
  filter,
  from,
  map,
  of,
  switchMap,
  take,
} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly user$: Observable<User | null>;
  private token$: Observable<string | null>;
  public readonly userId$: Observable<string>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth);
    this.token$ = idToken(this.auth);
    this.userId$ = this.user$.pipe(
      filter((user) => user !== null) as unknown as OperatorFunction<
        User | null,
        User
      >,
      map((user) => user.uid)
    );
  }

  firstValidToken$(): Observable<string> {
    return this.token$.pipe(
      filter((token) => token !== null) as OperatorFunction<
        string | null,
        string
      >,
      take(1)
    );
  }

  isAdmin(): Observable<boolean> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user === null) {
          return of(null);
        } else {
          return from(user.getIdTokenResult());
        }
      }),
      map((token) => {
        if (token === null) {
          return false;
        }
        return token.claims['admin'] === true;
      })
    );
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  sendSignInEmail(email: string): Observable<void> {
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this URL must be in the
      // authorized domains list in the Firebase Console.
      url: environment.emailSignInURL,
      // This must be true.
      handleCodeInApp: true,
    };
    window.localStorage.setItem('emailForSignIn', email);
    return from(sendSignInLinkToEmail(this.auth, email, actionCodeSettings));
  }

  signInWithEmailLink(): Observable<UserCredential | null> {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again.
        email = window.prompt('Please provide your email for confirmation');
      }
      if (!email) {
        throw new Error('User cancelled sign-in');
      }
      window.localStorage.removeItem('emailForSignIn');
      return from(signInWithEmailLink(this.auth, email, window.location.href));
    } else {
      throw new Error('Not a sign-in email link');
    }
  }
}
