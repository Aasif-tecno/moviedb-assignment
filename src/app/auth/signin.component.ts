import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  selector: 'app-sign-in',
})
export default class SignInComponent {
  showLoginForm = true;
  alert: { type: 'success' | 'error'; message: string } = {
    type: 'success',
    message: '',
  };
  showAlert: boolean = false;
  signInForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private _authSerice: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('developer@yopmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('123456', Validators.required),
    });
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignIn() {
    this.showAlert = false;
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this._authSerice.signIn(this.signInForm.value).subscribe(
      (resp) => {
        console.log('registerresp', resp);
        this._router.navigate(['/home']);
      },
      (error) => {
        this.showAlertFor3Sec();
        this.alert = { type: 'error', message: error };
      }
    );
  }
  onRegister() {
    this.showAlert = false;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this._authSerice.signUp(this.registerForm.value).subscribe(
      (resp) => {
        // this._router.navigate(['/home']);

        this.onToggleForm();
        this.alert = {
          type: 'success',
          message: 'Account registered succesfully',
        };
        this.showAlertFor3Sec();
      },
      (error) => {
        this.showAlertFor3Sec();
        this.alert = { type: 'error', message: error };
      }
    );
  }
  showAlertFor3Sec() {
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  onToggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showAlert = false;
    this.signInForm.reset();
    this.registerForm.reset();
  }
}
