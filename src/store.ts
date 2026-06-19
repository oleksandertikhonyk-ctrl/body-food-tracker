import { useEffect, useState } from 'react';
import type { AppData, DayLog, Profile } from './types';
import { seedFoods } from './data/foods';

export const STORAGE_KEY = 'body-food-tracker-v2';
const LEGACY_KEY = 'body-food-tracker-v1';
export const iso = (d = new Date()) => {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
};
export const emptyDay = (date = iso()): DayLog => ({ date, foods: [], water: 0 });
export const defaultProfile = (): Profile => targets({ weight: 75, height: 175, age: 30, sex: 'male', goal: 'maintain', activity: 'medium', pace: 'normal', targetWeight: 72, waterGoal: 2500 });

export function targets(p: Omit<Profile, 'calories' | 'protein' | 'fat' | 'carbs'>): Profile {
  const bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + (p.sex === 'male' ? 5 : -161);
  const maintenance = bmr * ({ low: 1.2, medium: 1.45, high: 1.7 }[p.activity]);
  const delta = p.goal === 'loss' ? -({ slow: 300, normal: 400, fast: 500 }[p.pace]) : p.goal === 'belly' ? -250 : p.goal === 'gain' ? 300 : 0;
  const calories = Math.max(1200, Math.round(maintenance + delta));
  const protein = Math.round(p.weight * 1.8), fat = Math.round(p.weight * .8);
  return { ...p, calories, protein, fat, carbs: Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4)), stepGoal: p.stepGoal ?? 8000, stepLength: p.stepLength ?? 0, addBurnedToGoal: p.addBurnedToGoal ?? false };
}

function validData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false;
  const d = value as Partial<AppData>;
  return !!d.days && typeof d.days === 'object' && Array.isArray(d.foods) && Array.isArray(d.recipes);
}
function load(): AppData {
  for (const key of [STORAGE_KEY, LEGACY_KEY]) {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(key) || 'null');
      if (validData(parsed)) {
        return { ...parsed, foods: mergeFoods(parsed.foods), recipes: parsed.recipes || [] };
      }
    } catch { /* ignore broken local data */ }
  }
  return { profile: defaultProfile(), days: {}, foods: seedFoods, recipes: [] };
}
function mergeFoods(saved: AppData['foods']) {
  const customs = saved.filter(f => f.custom);
  const state = new Map(saved.map(f => [f.id, f]));
  return [...seedFoods.map(f => ({ ...f, favorite: state.get(f.id)?.favorite, archived: state.get(f.id)?.archived, uses: state.get(f.id)?.uses || 0 })), ...customs.filter(f => !seedFoods.some(s => s.id === f.id))];
}

export function useStore() {
  const [data, setDataState] = useState<AppData>(load);
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(data)), [data]);
  const update = (fn: (d: AppData) => AppData) => setDataState(current => fn(structuredClone(current)));
  const setData = (next: AppData) => setDataState({ ...next, foods: mergeFoods(next.foods), recipes: next.recipes || [] });
  return { data, update, setData };
}
export const sumDay = (d?: DayLog) => d?.foods.reduce((a, f) => ({ calories: a.calories + f.calories, protein: a.protein + f.protein, fat: a.fat + f.fat, carbs: a.carbs + f.carbs }), { calories: 0, protein: 0, fat: 0, carbs: 0 }) ?? { calories: 0, protein: 0, fat: 0, carbs: 0 };
