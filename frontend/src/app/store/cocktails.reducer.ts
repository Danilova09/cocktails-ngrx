import { CocktailsState } from './types';
import { createReducer, on } from '@ngrx/store';
import { createCocktailFailure, createCocktailRequest, createCocktailSuccess } from './cocktails.actions';

const initialState: CocktailsState = {
  cocktails: [],
  createLoading: false,
  createError: null,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(createCocktailRequest, (state) => ({...state, createLoading: true})),
  (on(createCocktailSuccess, (state) => ({...state, createLoading: false}))),
  (on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error}))),
);
