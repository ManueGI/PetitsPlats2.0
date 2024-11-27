import { createRecipeCard } from "../templates/recipeCards.js";
import { extractUniqueKeywords, populateDropdown, toggleDropdown, filterDropdown } from "../utils/dropDown.js";
import { recipes } from "../../data/recipes.js";



export function displayRecipesPage() {
  const container = document.getElementById('recipe-cards');

  container.innerHTML = recipes.map(recipe => createRecipeCard(recipe)).join('');

  document.getElementById('ingredient-search').addEventListener('click', () => {
    toggleDropdown('ingredient');
  });
  document.getElementById('appliance-search').addEventListener('click', () => {
    toggleDropdown('appliance');
  });
  document.getElementById('utensil-search').addEventListener('click', () => {
    toggleDropdown('utensil');
  });

    // Récupérer les mots-clés uniques
    const ingredientKeywords = extractUniqueKeywords(recipes, 'ingredient');
    const applianceKeywords = extractUniqueKeywords(recipes, 'appliance');
    const utensilKeywords = extractUniqueKeywords(recipes, 'utensil');

    // Afficher les dropdowns
    populateDropdown('ingredient', 'Ingrédients', ingredientKeywords);
    populateDropdown('appliance', 'Appareils', applianceKeywords);
    populateDropdown('utensil', 'Ustensiles', utensilKeywords);
}
