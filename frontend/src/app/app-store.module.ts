import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './store/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';
import { cocktailsReducer } from './store/cocktails.reducer';
import { CocktailsEffects } from './store/cocktails.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
};

const reducers = {
  users: usersReducer,
  cocktails: cocktailsReducer,
};

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const effects = [
  UsersEffects,
  CocktailsEffects,
];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
