import type { Plant } from '../services/Plant.ts';

export type Action =
  | { type: 'ADD_PLANT_TO_GARDEN'; payload: { plantId: string } }
  | { type: 'REMOVE_PLANT_FROM_GARDEN'; payload: { plantId: string } }
  | { type: 'EDIT_PLANT_DETAILS'; payload: { plantId: string; newData: Partial<Plant> } }
  | { type: 'SET_GARDEN_NAME'; payload: { name: string } }
  | { type: 'NAVIGATE'; payload: { page: 'home' | 'edit-garden' | 'admin' } };



