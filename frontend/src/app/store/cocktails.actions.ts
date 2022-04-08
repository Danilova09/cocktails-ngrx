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

export const publishCocktailRequest = createAction('[Cocktails] Publish Request', props<{ cocktailId: string }>());
export const publishCocktailSuccess = createAction('[Cocktails] Publish Success');
export const publishCocktailFailure = createAction('[Cocktails] Publish Failure', props<{ error: string }>());

export const fetchCocktailDetailsRequest = createAction('[Cocktails] Fetch Cocktail Details Request', props<{ cocktailId: string }>());
export const fetchCocktailDetailsSuccess = createAction('[Cocktails] Fetch Cocktail Details Success', props<{ cocktailDetails: Cocktail }>());
export const fetchCocktailDetailsFailure = createAction('[Cocktails] Fetch Cocktail Details Failure', props<{ error: string }>());

export const fetchUsersCocktailsRequest = createAction('[Cocktails] Fetch Users Cocktails', props<{ userId: string }>());
export const fetchUsersCocktailsSuccess = createAction('[Cocktails] Fetch Users Cocktails Success', props<{ cocktails: Cocktail[] }>());
export const fetchUsersCocktailsFailure = createAction('[Cocktails] Fetch Users Cocktails Failure', props<{ error: string }>());
