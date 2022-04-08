export interface CocktailData {
  [key: string]: any,
  user: string,
  name: string,
  recipe: string,
  ingredients: [{
    ingredientName: string,
    ingredientAmount: string,
  }],
  image: File,
}

export interface Cocktail {
  _id: string,
  user: string,
  name: string,
  recipe: string,
  isPublished: boolean,
  ingredients: [{
    ingredientName: string,
    ingredientAmount: string,
  }],
  image: string,
}
