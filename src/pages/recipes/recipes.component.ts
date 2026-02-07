import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RecipeService, RecipeWithDetails, StateData } from '../../services/recipe.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesComponent {
  private recipeService = inject(RecipeService);
  
  allRecipes = signal<RecipeWithDetails[]>([]);
  states = signal<StateData[]>([]);

  // Filters
  stateFilter = new FormControl('All');
  categoryFilter = new FormControl('');
  nameFilter = new FormControl('');
  
  // Signals from form controls
  stateFilter$ = toSignal(this.stateFilter.valueChanges.pipe(startWith('All')));
  categoryFilter$ = toSignal(this.categoryFilter.valueChanges.pipe(startWith('')));
  nameFilter$ = toSignal(this.nameFilter.valueChanges.pipe(startWith('')));

  filteredRecipes = computed(() => {
    const recipes = this.allRecipes();
    const state = this.stateFilter$() ?? 'All';
    const category = this.categoryFilter$()?.toLowerCase() ?? '';
    const name = this.nameFilter$()?.toLowerCase() ?? '';

    return recipes.filter(recipe => {
      const stateMatch = state === 'All' || recipe.stateName === state;
      const categoryMatch = recipe.categoryName.toLowerCase().includes(category);
      const nameMatch = recipe.name.toLowerCase().includes(name);
      return stateMatch && categoryMatch && nameMatch;
    });
  });

  constructor() {
    this.allRecipes.set(this.recipeService.getAllRecipes());
    this.states.set(this.recipeService.getStates());
  }

  get stateNames(): string[] {
    return this.states().map(s => s.name);
  }
}
