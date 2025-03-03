import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { GoalModelComponent } from './goal-model/goal-model.component';
import { MatDialog } from '@angular/material/dialog';
import { GoalAddUpdateDialogComponent } from './goal-add-update-dialog/goal-add-update-dialog.component';
import { Goal } from '../../models/Goal';
import { GoalService } from '../../service/goal.service';
import { CounterComponent } from '../../components/counter/counter.component';
import { Observable } from 'rxjs';
import { User } from '../../models/LoginModel';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-goal',
  imports: [CommonModule, GoalModelComponent],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css',
})
export class GoalComponent {
  activeTab: string = 'tab1';

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
