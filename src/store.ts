import {useEffect,useState} from 'react';
import type {AppData,DayLog,Profile} from './types';
import {seedFoods} from './data/foods';
const KEY='body-food-tracker-v1';
export const iso=(d=new Date())=>d.toLocaleDateString('en-CA');
export const emptyDay=(date=iso()):DayLog=>({date,foods:[],water:0});
export function targets(p:Omit<Profile,'calories'|'protein'|'fat'|'carbs'>){const b=10*p.weight+6.25*p.height-5*p.age+(p.sex==='male'?5:-161);const t=b*({low:1.2,medium:1.45,high:1.7}[p.activity]);const delta=p.goal==='loss'?-({slow:300,normal:400,fast:500}[p.pace]):p.goal==='belly'?-250:p.goal==='gain'?300:0;const calories=Math.round(t+delta),protein=Math.round(p.weight*1.8),fat=Math.round(p.weight*.8);return{...p,calories,protein,fat,carbs:Math.round((calories-protein*4-fat*9)/4)}}
export function useStore(){const [data,setData]=useState<AppData>(()=>{try{const x=localStorage.getItem(KEY);if(x)return JSON.parse(x)}catch{}return{days:{},foods:seedFoods,recipes:[]}});useEffect(()=>localStorage.setItem(KEY,JSON.stringify(data)),[data]);const update=(fn:(d:AppData)=>AppData)=>setData(d=>fn(structuredClone(d)));return{data,update,setData}}
export const sumDay=(d?:DayLog)=>d?.foods.reduce((a,f)=>({calories:a.calories+f.calories,protein:a.protein+f.protein,fat:a.fat+f.fat,carbs:a.carbs+f.carbs}),{calories:0,protein:0,fat:0,carbs:0})??{calories:0,protein:0,fat:0,carbs:0};
