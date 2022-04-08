import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CocktailsService } from '../../services/cocktails.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { fetchUsersCocktailsRequest } from '../../store/cocktails.actions';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users-cocktails',
  templateUrl: './users-cocktails.component.html',
  styleUrls: ['./users-cocktails.component.sass']
})
export class UsersCocktailsComponent implements OnInit {
  cocktails!: Observable<null | Cocktail[]>;
  loading!: Observable<boolean>;
  env = environment;

  constructor(
    private route: ActivatedRoute,
    private cocktailsService: CocktailsService,
    private store: Store<AppState>,
  ) {
    this.cocktails = store.select(state => state.cocktails.usersCocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['user'];
    this.store.dispatch(fetchUsersCocktailsRequest({userId}));
  }
}
