import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/LoginModel';
import { addUser } from '../actions/user.actions';

export const initialState: User = {
  _id: '',
  age: 0,
  createdAt: new Date(),
  email: '',
  name: '',
  weight: 0,
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => ({ ...state, ...user }))
);
