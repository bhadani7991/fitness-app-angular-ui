import { User } from './LoginModel';

export interface ProfileUpdateRequest {
  name: string | null;
  age: number | null;
  weight: number | null;
  email: string | null;
}

export interface ProfileUpdateResponse {
  message: string;
  entity: User;
}
