import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { tap } from 'rxjs';
import { Cocktail, CocktailData } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {

  constructor(private http: HttpClient) {}

  createCocktail(cocktailData: CocktailData) {
    const formData = new FormData();
    Object.keys(cocktailData).forEach(key => {
      if (cocktailData[key] !== null) formData.append(key, cocktailData[key]);
    })
    return this.http.post<Cocktail>(env.apiUrl + '/cocktails', formData);
  }
}
