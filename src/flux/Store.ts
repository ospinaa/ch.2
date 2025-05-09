import { Action } from './actions';
import { dispatcher } from './dispatcher';

export type Plant = {
  id: string;
  commonName: string;
  scientificName: string;
  image: string;
};

type AppState = {
  gardenName: string;
  gardenPlants: string[]; 
  allPlants: Plant[];
  currentPage: 'home' | 'edit-garden' | 'admin';
};

const initialState: AppState = {
  gardenName: 'Mi Jardín',
  gardenPlants: [],
  allPlants: [],
  currentPage: 'home',
};

let state = initialState;
const listeners: (() => void)[] = [];

dispatcher.register((action: Action) => {
  switch (action.type) {
    case 'ADD_PLANT_TO_GARDEN':
      if (!state.gardenPlants.includes(action.payload.plantId)) {
        state = {
          ...state,
          gardenPlants: [...state.gardenPlants, action.payload.plantId],
        };
      }
      break;
    case 'REMOVE_PLANT_FROM_GARDEN':
      state = {
        ...state,
        gardenPlants: state.gardenPlants.filter(id => id !== action.payload.plantId),
      };
      break;
    case 'EDIT_PLANT_DETAILS':
      state = {
        ...state,
        allPlants: state.allPlants.map(p =>
          p.id === action.payload.plantId
            ? { ...p, ...action.payload.newData }
            : p
        ),
      };
      break;
    case 'SET_GARDEN_NAME':
      state = {
        ...state,
        gardenName: action.payload.name,
      };
      break;
    case 'NAVIGATE':
      state = {
        ...state,
        currentPage: action.payload.page,
      };
      break;
  }
  listeners.forEach(listener => listener());
});

export const getState = () => state;

export const subscribe = (listener: () => void) => {
  listeners.push(listener);
};
