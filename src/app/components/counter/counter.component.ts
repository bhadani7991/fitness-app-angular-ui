import { Component } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { counterReducer } from '../../app-state/reducers/counter.reducer';
import { Observable } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import {
  reset,
  increment,
  decrement,
} from '../../app-state/actions/counter.actions';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  increament() {
    this.store.dispatch(increment());
  }

  decreament() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
