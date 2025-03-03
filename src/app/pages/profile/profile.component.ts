import { Component, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/LoginModel';
import { Store } from '@ngrx/store';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MyErrorStateMatcher } from '../auth/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../service/profile.service';
import { addUser } from '../../app-state/actions/user.actions';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;

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

  constructor(
    private readonly store: Store<{ user: User }>,
    private readonly profileService: ProfileService
  ) {
    this.user$ = store.select('user');
  }
  ngOnInit(): void {
    this.user$.subscribe((value) => {
      this.name.setValue(value.name);
      this.emailId.setValue(value.email);
      this.age.setValue(value.age);
      this.weight.setValue(value.weight);
    });
  }

  handleProfileUpdate() {
    try {
      this.profileService
        .updateProfile({
          name: this.name.value,
          age: this.age.value,
          weight: this.weight.value,
          email: this.emailId.value,
        })
        .subscribe((value) =>
          this.store.dispatch(addUser({ user: value.entity }))
        );
    } catch (error) {
      console.log(error);
    }
  }
}
