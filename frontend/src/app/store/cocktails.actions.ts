import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData } from '../models/cocktail.model';

export const createCocktailRequest = createAction('[Cocktails] Create Cocktail Request', props<{ cocktailData: CocktailData }>());
export const createCocktailSuccess = createAction('[Cocktails] Create Cocktail Success', props<{ cocktail: Cocktail }>());
export const createCocktailFailure = createAction('[Cocktails] Create Cocktail Failure', props<{ error: string }>());
