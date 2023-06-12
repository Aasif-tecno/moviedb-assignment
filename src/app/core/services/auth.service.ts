import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { StorageService } from './storage.service';
import { User } from 'src/app/shared/interfaces/user';
// import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;
  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _storage: StorageService
  ) {
    if (this._storage.authenticated) {
      const user = this._storage.getLoggedUser();
      console.log('LOggedUser', user, this._storage.authenticated);
      this._authenticated = true;
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set user(user: User) {
    this._storage.logInUser(user);
  }

  get user(): User {
    return this._storage.getLoggedUser();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }
    return this._storage.getUser().pipe(
      switchMap((data: User[]) => {
        let existingUser = data.find((i) => i.email === credentials.email);
        if (!existingUser) {
          return throwError('User not found');
        }
        if (existingUser.password !== credentials.password) {
          return throwError('Password does not match');
        }
        this._storage.authenticated = true;
        this.user = existingUser;

        return of(existingUser);
      })
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    this._storage.removeUser();
    this._authenticated = false;
    this.user = {} as User;
    // Set the authenticated flag to false

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this._storage.getUser().pipe(
      switchMap((data: User[]) => {
        let existingUser = data.find((i) => i.email === user.email);
        if (existingUser) {
          return throwError('Email already exist');
        }

        return this._storage.addUser(user);
      })
    );
    // .subscribe((users) => {
    // });
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._storage.authenticated) {
      return of(true);
    }

    // If the access token exists and it didn't expire, sign in using it
    return of(false);
  }
}
