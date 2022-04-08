import { Component, OnInit } from '@angular/core';
import { CocktailsService } from '../../services/cocktails.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { deleteCocktailRequest, fetchCocktailsRequest, publishCocktailRequest } from '../../store/cocktails.actions';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.sass']
})
export class CocktailsComponent implements OnInit {
  cocktails!: Observable<Cocktail[]>;
  loading!: Observable<boolean>;
  env = environment;

  constructor(
    private cocktailsService: CocktailsService,
    private store: Store<AppState>,
  ) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCocktailsRequest());
  }

  publish(cocktailId: string) {
    this.store.dispatch(publishCocktailRequest({cocktailId}));
  }

  delete(cocktailId: string) {
    this.store.dispatch(deleteCocktailRequest({cocktailId}));
  }
}
