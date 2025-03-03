import { Component, inject, signal } from '@angular/core';
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
import { AsyncPipe, CommonModule } from '@angular/common';
import { SignUpService } from '../../service/sign-up.service';
import { Route, Router } from '@angular/router';
import { sign } from 'crypto';
import { User } from '../../models/LoginModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addUser } from '../../app-state/actions/user.actions';

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

  user = signal<User>({
    name: '',
    email: '',
    _id: '',
    age: 0,
    weight: 0,
    createdAt: new Date(),
  });

  constructor(
    private readonly loginService: LoginServiceService,
    private readonly authService: AuthService,
    private readonly signUpService: SignUpService,
    private readonly router: Router,
    private readonly store: Store
  ) {}

  handleLogin() {
    try {
      this.loginService
        .login({
          email: this.emailId.value,
          password: this.password.value,
        })
        .subscribe((value) => {
          this.authService.logIn(value.entity._id);
          this.user.set(value.entity);
          console.log('called');
          this.store.dispatch(addUser({ user: value.entity }));
          this.router.navigate(['/workouts']);
        });
    } catch (error: any) {}
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
      .subscribe((value) => value);
  }
  handleToggleLogin() {
    this.isLoginForm.set(!this.isLoginForm());
  }
}
