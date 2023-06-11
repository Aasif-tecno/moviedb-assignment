import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, from, Observable, of, switchMap, throwError } from 'rxjs';
// import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  async getLogedUser() {
    // const user = (await this.supabase.auth.getUser()).data;
    // const session = (await this.supabase.auth.getSession()).data;
    // if (user) {
    // this._userService.user = user?.user;
    // }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }
    // return from(this.supabase.auth.signUp(credentials)).pipe(
    //   switchMap((response: any) => {
    //     console.log('loginResp', response);
    //     if (response.error) {
    //       return throwError(response.error.message);
    //     }
    //     // this.accessToken = response.data.user.id;

    //     // this._authenticated = true;

    //     // this._userService.user = response.data.user;

    //     // Return a new observable with the response
    return of();
    //   })
    // );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

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
    company: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return of(true);
  }
}
