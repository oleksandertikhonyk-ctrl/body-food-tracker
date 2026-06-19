export type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Accuracy = 'exact' | 'estimated' | 'rough';

export type Serving = { label: string; grams: number };
export type Food = {
  id: string; name: string; aliases: string[]; calories: number; protein: number;
  fat: number; carbs: number; category: string; servings: Serving[];
  favorite?: boolean; archived?: boolean; uses?: number; custom?: boolean;
};
export type FoodLog = {
  id: string; foodId: string; name: string; meal: Meal; grams: number;
  servingLabel: string; calories: number; protein: number; fat: number; carbs: number;
  accuracy: Accuracy; createdAt: string;
};
export type DayLog = {
  date: string; foods: FoodLog[]; water: number; weight?: number; belly?: number;
  bloating?: number; steps?: number; burned?: number; activityMinutes?: number; notes?: string;
};
export type Profile = {
  weight: number; height: number; age: number; sex: 'male' | 'female';
  goal: 'belly' | 'loss' | 'maintain' | 'gain'; activity: 'low' | 'medium' | 'high';
  pace: 'slow' | 'normal' | 'fast'; targetWeight: number; waterGoal: number;
  calories: number; protein: number; fat: number; carbs: number;
};
export type RecipeIngredient = { foodId: string; grams: number };
export type Recipe = { id: string; name: string; ingredients: RecipeIngredient[]; servings: number; archived?: boolean };
export type AppData = { profile?: Profile; days: Record<string, DayLog>; foods: Food[]; recipes: Recipe[] };
