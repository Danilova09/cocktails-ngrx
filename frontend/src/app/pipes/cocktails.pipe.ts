import { Pipe, PipeTransform } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Pipe({
  name: 'cocktails'
})
export class CocktailsPipe implements PipeTransform {
  transform(cocktails: Cocktail[] | null): Cocktail[] | null {
    if (!cocktails) {
      return cocktails;
    }

    return cocktails.filter(cocktail => cocktail.isPublished);
  }
}

