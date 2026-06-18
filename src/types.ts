export type Meal='breakfast'|'lunch'|'dinner'|'snack';
export type Food={id:string;name:string;aliases:string[];calories:number;protein:number;fat:number;carbs:number;category:string;servings:{label:string;grams:number}[];favorite?:boolean;archived?:boolean;uses?:number;custom?:boolean};
export type FoodLog={id:string;foodId:string;name:string;meal:Meal;grams:number;servingLabel:string;calories:number;protein:number;fat:number;carbs:number;accuracy:'Точно'|'Приблизно'|'Дуже приблизно';createdAt:string};
export type DayLog={date:string;foods:FoodLog[];water:number;weight?:number;belly?:number;bloating?:number;steps?:number;burned?:number;notes?:string;triggers?:string[]};
export type Profile={weight:number;height:number;age:number;sex:'male'|'female';goal:'belly'|'loss'|'maintain'|'gain';activity:'low'|'medium'|'high';pace:'slow'|'normal'|'fast';targetWeight:number;waterGoal:number;calories:number;protein:number;fat:number;carbs:number};
export type Recipe={id:string;name:string;ingredients:{foodId:string;grams:number}[];servings:number;archived?:boolean};
export type AppData={profile?:Profile;days:Record<string,DayLog>;foods:Food[];recipes:Recipe[]};
