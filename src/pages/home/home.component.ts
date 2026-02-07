import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../../components/hero/hero.component';
import { StateSelectorComponent } from '../../components/state-selector/state-selector.component';
import { RecipeDisplayComponent } from '../../components/recipe-display/recipe-display.component';
import { RecipeService, StateData } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    StateSelectorComponent,
    RecipeDisplayComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private recipeService = inject(RecipeService);

  states = this.recipeService.getStates();
  selectedState = signal<StateData>(this.states[0]);
  isLoading = signal(true);
  recipeData = signal<StateData>(this.states[0]);

  constructor() {
    this.loadRecipesForState(this.states[0]);
  }

  handleStateSelection(state: StateData) {
    this.selectedState.set(state);
    this.loadRecipesForState(state);
  }

  private loadRecipesForState(state: StateData) {
    this.isLoading.set(true);
    // Update recipe data shell immediately for instant title update
    this.recipeData.set({ ...state, categories: [] });

    this.recipeService.getRecipesForState(state.name).subscribe(data => {
      this.recipeData.set(data);
      this.isLoading.set(false);
    });
  }
}
