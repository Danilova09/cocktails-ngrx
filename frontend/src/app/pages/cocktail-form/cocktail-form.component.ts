import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createCocktailRequest } from '../../store/cocktails.actions';

@Component({
  selector: 'app-cocktail-form',
  templateUrl: './cocktail-form.component.html',
  styleUrls: ['./cocktail-form.component.sass']
})
export class CocktailFormComponent implements OnInit {
  userId!: string | undefined;
  cocktailForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    });
  }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      recipe: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      ingredients: new FormArray([
        new FormGroup({
          ingredientName: new FormControl('', Validators.required),
          ingredientAmount: new FormControl('', Validators.required),
        })
      ]),
    });
  }

  getIngredientsControls() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  addIngredient() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const newIngredient = new FormGroup({
      ingredientName: new FormControl('', Validators.required),
      ingredientAmount: new FormControl('', Validators.required),
    });
    ingredients.push(newIngredient);
  }

  deleteIngredient(index: number) {
    const ingredientsArray = <FormArray>this.cocktailForm.get('ingredients');
    if (ingredientsArray.length !== 1) {
      ingredientsArray.removeAt(index);
    }
  }

  fieldHasErrors(fieldName: string, errorType: string) {
    const field = this.cocktailForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  ingredientFieldHasError(fieldName: string, errorType: string, index: number) {
    const ingredients = this.cocktailForm.get('ingredients') as FormArray;
    const fieldGroup = ingredients.at(index);
    const field = fieldGroup.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  onSubmit() {
    if (this.cocktailForm.valid) {
      const ingredients = JSON.stringify(this.cocktailForm.controls['ingredients'].value);
      const cocktailData = {...this.cocktailForm.value, ingredients, user: this.userId};
      this.store.dispatch(createCocktailRequest({cocktailData}));
    }
  }
}
