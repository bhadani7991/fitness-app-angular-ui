import { Routes } from '@angular/router';
import { GoalComponent } from './pages/goal/goal.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './service/auth.guard';
import { LoginComponent } from './pages/auth/login.component';

export const routes: Routes = [
  { path: 'workouts', component: WorkoutComponent, canActivate: [authGuard] },
  { path: 'goals', component: GoalComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, // Default route
  { path: '**', redirectTo: '/workouts' }, // Wildcard route for unknown paths
];
