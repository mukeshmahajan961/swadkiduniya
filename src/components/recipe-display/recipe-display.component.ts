import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category, StateData } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDisplayComponent {
  state = input.required<StateData>();
  isLoading = input.required<boolean>();

  // Use a computed signal to automatically reset the category when the state changes
  activeCategory = computed(() => {
    const currentState = this.state();
    if (currentState && currentState.categories.length > 0) {
      return currentState.categories[0];
    }
    return null;
  });

  // This signal will now hold the user-selected category
  userSelectedCategory = signal<Category | null>(null);

  // The final active category to use for display. It's either user-selected, or the default from computed.
  displayCategory = computed(() => this.userSelectedCategory() ?? this.activeCategory());

  selectCategory(category: Category) {
    this.userSelectedCategory.set(category);
  }
}
