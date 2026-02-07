import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService, RecipeWithDetails } from '../../services/recipe.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private location = inject(Location);
  
  recipe = signal<RecipeWithDetails | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const stateName = params.get('stateName');
      const recipeSlug = params.get('recipeSlug');
      
      if (stateName && recipeSlug) {
        const recipeDetails = this.recipeService.getRecipeDetails(stateName, recipeSlug);
        this.recipe.set(recipeDetails ?? null);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
