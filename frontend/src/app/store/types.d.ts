import { LoginError, RegisterError, User } from '../models/user.model';
import { Cocktail } from '../models/cocktail.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type CocktailsState = {
  cocktails: Cocktail[],
  createLoading: boolean,
  createError: null | string,
}

export type AppState = {
  users: UsersState,
  cocktails: CocktailsState,
}
