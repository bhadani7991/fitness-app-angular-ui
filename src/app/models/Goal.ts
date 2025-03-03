export interface Goal {
  workoutsPerWeek: number | null;
  targetWeight: number | null;
  caloriesBurnedGoal: number | null;
}

export interface GoalResponse {
  message: string;
  entity: Goal;
}
