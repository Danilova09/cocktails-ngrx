import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CocktailFormComponent } from './pages/cocktail-form/cocktail-form.component';
import { CocktailsDetailsComponent } from './pages/cocktails-details/cocktails-details.component';
import { UsersCocktailsComponent } from './pages/users-cocktails/users-cocktails.component';
import { RoleGuardService } from './services/role-guard.service';


const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cocktail-details/:id', component: CocktailsDetailsComponent},
  {
    path: 'new-cocktail', component: CocktailFormComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'users-cocktails', component: UsersCocktailsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
