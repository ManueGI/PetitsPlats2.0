import { createRecipeCard } from "../templates/recipeCards.js";
import { recipes } from "../../data/recipes.js";

export function displayRecipesPage() {
  const container = document.getElementById('recipe-cards');

  container.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');
}
