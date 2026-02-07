import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Recipe {
  name: string;
  slug: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

export interface Category {
  name: string;
  recipes: Recipe[];
}

export interface StateData {
  name: string;
  image: string;
  categories: Category[];
}

export interface RecipeWithDetails extends Recipe {
  stateName: string;
  categoryName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private data: StateData[] = [
    {
      name: 'Gujarat',
      image: 'https://picsum.photos/id/111/200/200',
      categories: [
        {
          name: 'Breakfast',
          recipes: [
            { name: 'Dhokla', slug: 'dhokla', description: 'A savory steamed cake.', image: 'https://picsum.photos/id/211/400/300', ingredients: ['Gram flour', 'Yogurt', 'Turmeric', 'Eno'], instructions: ['Mix ingredients.', 'Steam for 20 minutes.'] },
            { name: 'Khandvi', slug: 'khandvi', description: 'Soft, melt-in-your-mouth rolls.', image: 'https://picsum.photos/id/212/400/300', ingredients: ['Gram flour', 'Buttermilk', 'Mustard seeds'], instructions: ['Cook batter.', 'Spread thin and roll.'] },
            { name: 'Fafda-Jalebi', slug: 'fafda-jalebi', description: 'A classic sweet and savory combo.', image: 'https://picsum.photos/id/213/400/300', ingredients: ['Gram flour', 'All-purpose flour', 'Sugar syrup'], instructions: ['Fry Fafda.', 'Fry Jalebi and soak in syrup.'] },
          ]
        },
        {
          name: 'Lunch',
          recipes: [
            { name: 'Undhiyu', slug: 'undhiyu', description: 'Mixed vegetable casserole.', image: 'https://picsum.photos/id/214/400/300', ingredients: ['Mixed winter vegetables', 'Spices'], instructions: ['Cook vegetables in a special masala.'] },
            { name: 'Gujarati Kadhi', slug: 'gujarati-kadhi', description: 'Sweet and spicy yogurt curry.', image: 'https://picsum.photos/id/215/400/300', ingredients: ['Yogurt', 'Gram flour', 'Spices'], instructions: ['Simmer all ingredients together.'] },
          ]
        },
        {
          name: 'Sweets',
          recipes: [
            { name: 'Basundi', slug: 'basundi', description: 'Sweetened condensed milk dessert.', image: 'https://picsum.photos/id/216/400/300', ingredients: ['Milk', 'Sugar', 'Nuts'], instructions: ['Reduce milk until thick.'] },
            { name: 'Mohanthal', slug: 'mohanthal', description: 'A dense, gram flour fudge.', image: 'https://picsum.photos/id/217/400/300', ingredients: ['Gram flour', 'Ghee', 'Sugar'], instructions: ['Roast flour, add sugar syrup.'] },
          ]
        }
      ]
    },
    {
      name: 'Punjab',
      image: 'https://picsum.photos/id/112/200/200',
      categories: [
        {
          name: 'Main Course',
          recipes: [
            { name: 'Butter Chicken', slug: 'butter-chicken', description: 'Creamy and rich chicken curry.', image: 'https://picsum.photos/id/221/400/300', ingredients: ['Chicken', 'Tomato puree', 'Cream', 'Butter'], instructions: ['Marinate and grill chicken.', 'Simmer in tomato gravy.'] },
            { name: 'Sarson da Saag', slug: 'sarson-da-saag', description: 'Mustard greens with makki di roti.', image: 'https://picsum.photos/id/222/400/300', ingredients: ['Mustard leaves', 'Spinach', 'Cornbread'], instructions: ['Cook greens.', 'Serve with cornbread.'] },
            { name: 'Chole Bhature', slug: 'chole-bhature', description: 'Spicy chickpeas with fried bread.', image: 'https://picsum.photos/id/223/400/300', ingredients: ['Chickpeas', 'All-purpose flour', 'Spices'], instructions: ['Cook chickpeas.', 'Fry bread.'] },
          ]
        },
        {
          name: 'Sweets',
          recipes: [
            { name: 'Gajar ka Halwa', slug: 'gajar-ka-halwa', description: 'Sweet carrot pudding.', image: 'https://picsum.photos/id/224/400/300', ingredients: ['Carrots', 'Milk', 'Sugar', 'Ghee'], instructions: ['Cook carrots in milk.', 'Add sugar and ghee.'] },
            { name: 'Pinni', slug: 'pinni', description: 'A winter delicacy made of flour.', image: 'https://picsum.photos/id/225/400/300', ingredients: ['Whole wheat flour', 'Ghee', 'Nuts'], instructions: ['Roast flour.', 'Mix with nuts and form balls.'] },
          ]
        }
      ]
    },
    {
      name: 'Kerala',
      image: 'https://picsum.photos/id/113/200/200',
      categories: [
        {
          name: 'Breakfast',
          recipes: [
            { name: 'Puttu and Kadala Curry', slug: 'puttu-and-kadala-curry', description: 'Steamed rice cake with black chickpea curry.', image: 'https://picsum.photos/id/231/400/300', ingredients: ['Rice flour', 'Coconut', 'Black chickpeas'], instructions: ['Steam rice cake.', 'Prepare chickpea curry.'] },
            { name: 'Appam with Stew', slug: 'appam-with-stew', description: 'Lacy rice pancakes with a coconut milk stew.', image: 'https://picsum.photos/id/232/400/300', ingredients: ['Rice', 'Coconut milk', 'Vegetables'], instructions: ['Make pancakes.', 'Cook stew.'] },
          ]
        },
        {
          name: 'Seafood',
          recipes: [
            { name: 'Karimeen Pollichathu', slug: 'karimeen-pollichathu', description: 'Spiced pearl spot fish.', image: 'https://picsum.photos/id/233/400/300', ingredients: ['Pearl spot fish', 'Spices', 'Banana leaf'], instructions: ['Marinate fish.', 'Wrap in leaf and grill.'] },
            { name: 'Fish Molee', slug: 'fish-molee', description: 'A mild and flavorful fish curry.', image: 'https://picsum.photos/id/234/400/300', ingredients: ['Fish', 'Coconut milk', 'Spices'], instructions: ['Cook fish in coconut gravy.'] },
          ]
        }
      ]
    },
     {
      name: 'Bengal',
      image: 'https://picsum.photos/id/114/200/200',
      categories: [
        {
          name: 'Fish',
          recipes: [
            { name: 'Shorshe Ilish', slug: 'shorshe-ilish', description: 'Hilsa fish in mustard gravy.', image: 'https://picsum.photos/id/241/400/300', ingredients: ['Hilsa fish', 'Mustard paste', 'Green chilies'], instructions: ['Cook fish in mustard gravy.'] },
            { name: 'Chingri Malai Curry', slug: 'chingri-malai-curry', description: 'Prawns in a creamy coconut curry.', image: 'https://picsum.photos/id/242/400/300', ingredients: ['Prawns', 'Coconut milk', 'Spices'], instructions: ['Cook prawns in coconut curry.'] },
          ]
        },
        {
          name: 'Sweets',
          recipes: [
            { name: 'Rasgulla', slug: 'rasgulla', description: 'Spongy cheese balls in syrup.', image: 'https://picsum.photos/id/243/400/300', ingredients: ['Chenna', 'Sugar', 'Water'], instructions: ['Make cheese balls.', 'Boil in sugar syrup.'] },
            { name: 'Sandesh', slug: 'sandesh', description: 'A delicate sweet made from paneer.', image: 'https://picsum.photos/id/244/400/300', ingredients: ['Chenna', 'Sugar', 'Cardamom'], instructions: ['Knead chenna.', 'Cook with sugar and set.'] },
          ]
        }
      ]
    },
    {
      name: 'Rajasthan',
      image: 'https://picsum.photos/id/115/200/200',
      categories: [
        {
          name: 'Main Course',
          recipes: [
            { name: 'Dal Baati Churma', slug: 'dal-baati-churma', description: 'A trio of lentils, baked bread, and powdered sweet.', image: 'https://picsum.photos/id/251/400/300', ingredients: ['Lentils', 'Wheat flour', 'Ghee'], instructions: ['Cook dal.', 'Bake baati.', 'Prepare churma.'] },
            { name: 'Gatte ki Sabzi', slug: 'gatte-ki-sabzi', description: 'Gram flour dumplings in a tangy gravy.', image: 'https://picsum.photos/id/252/400/300', ingredients: ['Gram flour', 'Yogurt', 'Spices'], instructions: ['Make dumplings.', 'Cook in yogurt gravy.'] },
          ]
        },
        {
          name: 'Snacks',
          recipes: [
            { name: 'Mirchi Bada', slug: 'mirchi-bada', description: 'Spicy chili fritters.', image: 'https://picsum.photos/id/253/400/300', ingredients: ['Large green chilies', 'Potato filling', 'Gram flour'], instructions: ['Stuff chilies.', 'Batter-fry them.'] },
          ]
        }
      ]
    }
  ];

  getStates(): StateData[] {
    return this.data;
  }

  getRecipesForState(stateName: string): Observable<StateData> {
    const state = this.data.find(s => s.name === stateName);
    return of(state!).pipe(delay(1000)); // Simulate 1s network delay
  }

  getAllRecipes(): RecipeWithDetails[] {
    const allRecipes: RecipeWithDetails[] = [];
    this.data.forEach(state => {
      state.categories.forEach(category => {
        category.recipes.forEach(recipe => {
          allRecipes.push({
            ...recipe,
            stateName: state.name,
            categoryName: category.name
          });
        });
      });
    });
    return allRecipes;
  }

  getRecipeDetails(stateName: string, recipeSlug: string): RecipeWithDetails | undefined {
    const state = this.data.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (!state) return undefined;

    for (const category of state.categories) {
      const recipe = category.recipes.find(r => r.slug === recipeSlug);
      if (recipe) {
        return {
          ...recipe,
          stateName: state.name,
          categoryName: category.name
        };
      }
    }
    return undefined;
  }
}
