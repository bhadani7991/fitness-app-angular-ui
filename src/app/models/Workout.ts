export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Workout {
  _id?: string;
  type: string;
  duration: number;
  caloriesBurned: number;
  updatedAt: Date;
}

export interface WorkoutResponse {
  message: string;
  entity: Workout[];
}

export interface WorkoutRequest {
  type: string | null;
  duration: number | null;
  caloriesBurned: number | null;
  updatedAt: Date | null;
}

export interface WorkoutAddResponse {
  message: string;
}
