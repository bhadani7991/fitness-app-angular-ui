export interface User {
  name: string;
  email: string;
  age: number;
  weight: number;
  createdAt: Date;
  _id: string;
}

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface AuthResponse {
  message: string;
  entity: User;
}
