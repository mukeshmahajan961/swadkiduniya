import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:stateName/:recipeSlug', component: RecipeDetailComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'favorites', 
    component: FavoritesComponent,
    canActivate: [authGuard] 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Wildcard route redirects to home
];
