import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CocktailsService } from '../services/cocktails.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess, deleteCocktailFailure, deleteCocktailRequest, deleteCocktailSuccess, fetchCocktailsFailure,
  fetchCocktailsRequest, fetchCocktailsSuccess
} from './cocktails.actions';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './types';

@Injectable()
export class CocktailsEffects {
  constructor(
    private actions: Actions,
    private cocktailsService: CocktailsService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {
  }

  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(() => this.cocktailsService.getCocktails().pipe(
      map(cocktails => fetchCocktailsSuccess({cocktails})),
      catchError((error) => of(fetchCocktailsFailure({error})))
    ))
  ));

  createCocktail = createEffect(() => this.actions.pipe(
      ofType(createCocktailRequest),
      mergeMap(({cocktailData}) => this.cocktailsService.createCocktail(cocktailData).pipe(
        map(cocktail => createCocktailSuccess({cocktail})),
        tap(({cocktail}) => {
          this.helpers.openSnackbar('Cocktail created!');
          void this.router.navigate(['/']);
        }),
        this.helpers.catchServerError(createCocktailFailure)
      ))
    )
  );

  deleteCocktail = createEffect(() => this.actions.pipe(
    ofType(deleteCocktailRequest),
    mergeMap(({cocktailId}) => this.cocktailsService.removeCocktail(cocktailId).pipe(
      map(() => deleteCocktailSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Cocktail deleted!');
        this.store.dispatch(fetchCocktailsRequest());
      }),
      this.helpers.catchServerError(deleteCocktailFailure)
    ))
  ));
}
