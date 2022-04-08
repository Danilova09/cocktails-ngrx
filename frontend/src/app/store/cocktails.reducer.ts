import { CocktailsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess, deleteCocktailFailure, deleteCocktailRequest, deleteCocktailSuccess, fetchCocktailsFailure,
  fetchCocktailsRequest, fetchCocktailsSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  cocktails: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, (state) => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, cocktails})),
  on(fetchCocktailsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(createCocktailRequest, (state) => ({...state, createLoading: true})),
  on(createCocktailSuccess, (state) => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),
  on(deleteCocktailRequest, (state) => ({...state, deleteLoading: true})),
  on(deleteCocktailSuccess, (state) => ({...state, deleteLoading: false})),
  on(deleteCocktailFailure, (state, {error}) => ({...state, deleteLoading: false, deleteError: error})),
);
