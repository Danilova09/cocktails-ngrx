import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData } from '../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request');
export const fetchCocktailsSuccess = createAction('[Cocktails] Fetch Success', props<{ cocktails: Cocktail[] }>());
export const fetchCocktailsFailure = createAction('[Cocktails] Fetch Failure', props<{ error: string }>());

export const createCocktailRequest = createAction('[Cocktails] Create Cocktail Request', props<{ cocktailData: CocktailData }>());
export const createCocktailSuccess = createAction('[Cocktails] Create Cocktail Success', props<{ cocktail: Cocktail }>());
export const createCocktailFailure = createAction('[Cocktails] Create Cocktail Failure', props<{ error: string }>());

export const deleteCocktailRequest = createAction('[Cocktails] Delete Request', props<{ cocktailId: string }>());
export const deleteCocktailSuccess = createAction('[Cocktails] Delete Success');
export const deleteCocktailFailure = createAction('[Cocktails] Delete Failure', props<{ error: string }>());
