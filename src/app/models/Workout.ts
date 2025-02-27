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
