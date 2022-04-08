import { CocktailsState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess,
  deleteCocktailFailure,
  deleteCocktailRequest,
  deleteCocktailSuccess,
  fetchCocktailDetailsFailure,
  fetchCocktailDetailsRequest,
  fetchCocktailDetailsSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchUsersCocktailsFailure,
  fetchUsersCocktailsRequest,
  fetchUsersCocktailsSuccess,
  publishCocktailFailure,
  publishCocktailRequest,
  publishCocktailSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  usersCocktails: [],
  cocktailDetails: null,
  cocktails: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  deleteLoading: false,
  deleteError: null,
  publishLoading: false,
  publishError: null,
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
  on(publishCocktailRequest, (state) => ({...state, publishLoading: true})),
  on(publishCocktailSuccess, (state) => ({...state, publishLoading: false})),
  on(publishCocktailFailure, (state, {error}) => ({...state, publishLoading: false, publishError: error})),
  on(fetchCocktailDetailsRequest, (state) => ({...state, fetchLoading: true})),
  on(fetchCocktailDetailsSuccess, (state, {cocktailDetails}) => ({...state, fetchLoading: false, cocktailDetails})),
  on(fetchCocktailDetailsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(fetchUsersCocktailsRequest, (state) => ({...state, fetchLoading: true})),
  on(fetchUsersCocktailsSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, usersCocktails: cocktails})),
  on(fetchUsersCocktailsFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
);
