import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginServiceService } from '../../service/login-service.service';
import { AuthService } from '../../service/auth.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { SignUpService } from '../../service/sign-up.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  emailId = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
    ),
  ]);
  name = new FormControl<string>('', [Validators.required]);
  age = new FormControl<number>(0, [Validators.required]);
  weight = new FormControl<number>(0, [Validators.required]);
  matcher = new MyErrorStateMatcher();
  isLoginForm = signal<boolean>(true);

  constructor(
    private readonly loginService: LoginServiceService,
    private readonly authService: AuthService,
    private readonly signUpService: SignUpService
  ) {}

  handleLogin() {
    try {
      this.loginService
        .login({
          email: this.emailId.value,
          password: this.password.value,
        })
        .subscribe((value) => this.authService.logIn(value.entity._id));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  handleSignup() {
    this.signUpService
      .handleSignUpRequest({
        name: this.name.value,
        email: this.emailId.value,
        age: this.age.value,
        weight: this.weight.value,
        password: this.password.value,
      })
      .subscribe((value) => console.log(value.entity));
  }
  handleToggleLogin() {
    this.isLoginForm.set(!this.isLoginForm());
  }
}
