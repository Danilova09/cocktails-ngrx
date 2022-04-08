import { Ingredient } from './ingredient.model';

export interface CocktailData {
  [key: string]: any,
  user: string,
  name: string,
  recipe: string,
  ingredients: Ingredient[],
  image: File,
}

export interface Cocktail {
  _id: string,
  user: string,
  name: string,
  recipe: string,
  isPublished: boolean,
  ingredients: Ingredient[],
  image: string,
}
