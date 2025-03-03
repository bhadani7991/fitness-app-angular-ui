import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { SignUpService } from '../../service/sign-up.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  menuOptions = ['Workout', 'Goal', 'Profile', 'Logout'];
  isMenuOpen = false;

  isLoggedIn = false;
  constructor(
    private readonly authService: AuthService,
    private readonly signUpService: SignUpService,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
