export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Accuracy = 'exact' | 'estimated' | 'rough';
export type Intensity = 'light' | 'medium' | 'high';
export type ActivityType = 'walking' | 'running' | 'cycling' | 'gym' | 'strength' | 'home' | 'physical-work' | 'swimming' | 'football' | 'boxing' | 'stretching' | 'other';
export type StepEntry = { id: string; date: string; steps: number; calories: number; note: string; createdAt: string; updatedAt: string };
export type ActivityEntry = { id: string; date: string; type: ActivityType; durationMinutes: number; intensity: Intensity; met: number; calories: number; manualCalories: boolean; note: string; createdAt: string; updatedAt: string };

export type Serving = { label: string; grams: number };
export type Food = {
  id: string; name: string; aliases: string[]; calories: number; protein: number;
  fat: number; carbs: number; category: string; servings: Serving[];
  favorite?: boolean; archived?: boolean; uses?: number; custom?: boolean; barcode?: string;
};
export type FoodLog = {
  id: string; foodId: string; name: string; meal: Meal; grams: number;
  servingLabel: string; calories: number; protein: number; fat: number; carbs: number;
  accuracy: Accuracy; createdAt: string;
};
export type DayLog = {
  date: string; foods: FoodLog[]; water: number; weight?: number; belly?: number;
  bloating?: number; steps?: number; burned?: number; activityMinutes?: number; notes?: string;
  stepEntries?: StepEntry[]; activities?: ActivityEntry[];
};
export type Profile = {
  weight: number; height: number; age: number; sex: 'male' | 'female';
  goal: 'belly' | 'loss' | 'maintain' | 'gain'; activity: 'low' | 'medium' | 'high';
  pace: 'slow' | 'normal' | 'fast'; targetWeight: number; waterGoal: number;
  calories: number; protein: number; fat: number; carbs: number;
  stepGoal?: number; stepLength?: number; addBurnedToGoal?: boolean;
};
export type RecipeIngredient = { foodId: string; grams: number };
export type Recipe = { id: string; name: string; ingredients: RecipeIngredient[]; servings: number; archived?: boolean };
export type AppData = { profile?: Profile; days: Record<string, DayLog>; foods: Food[]; recipes: Recipe[] };
