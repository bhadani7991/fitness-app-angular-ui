import { Routes } from '@angular/router';
import { GoalComponent } from './pages/goal/goal.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: 'workouts', component: WorkoutComponent },
  { path: 'goals', component: GoalComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/workouts', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/workouts' }, // Wildcard route for unknown paths
];
