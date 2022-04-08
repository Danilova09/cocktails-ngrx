import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchCocktailDetailsRequest } from '../../store/cocktails.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cocktails-details',
  templateUrl: './cocktails-details.component.html',
  styleUrls: ['./cocktails-details.component.sass']
})
export class CocktailsDetailsComponent implements OnInit {
  cocktail!: Observable<null | Cocktail>;
  env = environment;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.cocktail = store.select(state => state.cocktails.cocktailDetails);
  }

  ngOnInit(): void {
    const cocktailId = this.route.snapshot.params['id'];
    this.store.dispatch(fetchCocktailDetailsRequest({cocktailId}));
  }
}
