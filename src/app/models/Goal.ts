export interface Goal {
  workoutsPerWeek: number;
  targetWeight: number;
  caloriesBurnedGoal: number;
  updatedAt: Date;
}

export interface GoalResponse {
  message: string;
  entity: Goal;
}
