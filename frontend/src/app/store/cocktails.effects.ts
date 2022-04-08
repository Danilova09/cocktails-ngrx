import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CocktailsService } from '../services/cocktails.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
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
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { User } from '../models/user.model';

@Injectable()
export class CocktailsEffects {
  user!: undefined | null | User;

  constructor(
    private actions: Actions,
    private cocktailsService: CocktailsService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.user = user;
    });
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
          if (this.user?.role === 'admin') {
            this.helpers.openSnackbar('Cocktail created!');
          } else if (this.user?.role === 'user') {
            this.helpers.openSnackbar('Your cocktail is being reviewed by a moderator');
          }
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


  publishCocktail = createEffect(() => this.actions.pipe(
    ofType(publishCocktailRequest),
    mergeMap(({cocktailId}) => this.cocktailsService.publishCocktail(cocktailId).pipe(
      map(() => publishCocktailSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Cocktail published!');
        this.store.dispatch(fetchCocktailsRequest());
      }),
      this.helpers.catchServerError(publishCocktailFailure)
    ))
  ));

  fetchCocktailDetails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailDetailsRequest),
    mergeMap(({cocktailId}) => this.cocktailsService.getCocktailDetails(cocktailId).pipe(
      map((cocktailDetails) => fetchCocktailDetailsSuccess({cocktailDetails})),
      this.helpers.catchServerError(fetchCocktailDetailsFailure)
    ))
  ));

  fetchUsersCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchUsersCocktailsRequest),
    mergeMap(({userId}) => this.cocktailsService.getUsersCocktails(userId).pipe(
      map((cocktails) => fetchUsersCocktailsSuccess({cocktails})),
      this.helpers.catchServerError(fetchUsersCocktailsFailure),
    ))
  ));
}
