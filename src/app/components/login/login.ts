import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Authservice } from '../../shared/services/authservice';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(Authservice);
  router = inject(Router);
  errorMessage = '';


  loginFormGroup = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })

  })


  get emailFormControl() {
    return this.loginFormGroup.controls.email;
  }
  get passwordFormControl() {
    return this.loginFormGroup.controls.password;
  }

  onSubmit() {
    if (this.loginFormGroup.invalid) {
      this.errorMessage = 'Please enter valid email and password.';
      return;
    }

    this.errorMessage = '';
    const formValue = this.loginFormGroup.getRawValue();

    this.authService.login(formValue.email, formValue.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.authService.user.set(response);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = error?.error?.message || 'Login failed. Please check your credentials and try again.';
      }
    });
  }
}
