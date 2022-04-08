import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CocktailsService } from '../services/cocktails.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { createCocktailFailure, createCocktailRequest, createCocktailSuccess } from './cocktails.actions';
import { mergeMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CocktailsEffects {
  constructor(
    private actions: Actions,
    private cocktailsService: CocktailsService,
    private router: Router,
    private helpers: HelpersService,
  ) {
  }

  createCocktail = createEffect(() => this.actions.pipe(
      ofType(createCocktailRequest),
      mergeMap(({cocktailData}) => this.cocktailsService.createCocktail(cocktailData).pipe(
        map(cocktail => createCocktailSuccess({cocktail})),
        tap(({cocktail}) => {
          console.log(cocktail);
          this.helpers.openSnackbar('Cocktail created!');
          void this.router.navigate(['/']);
        }),
        this.helpers.catchServerError(createCocktailFailure)
      ))
    )
  );
}
