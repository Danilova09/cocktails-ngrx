import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CocktailFormComponent } from './pages/cocktail-form/cocktail-form.component';
import { CocktailsDetailsComponent } from './pages/cocktails-details/cocktails-details.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-cocktail', component: CocktailFormComponent},
  {path: 'cocktail-details/:id', component: CocktailsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
