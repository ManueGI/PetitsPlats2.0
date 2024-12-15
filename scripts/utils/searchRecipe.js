export function searchRecipe(recipes, searchValue, selectedTags) {
  const searchLower = searchValue ? searchValue.toLowerCase() : '';
  const filteredRecipes = [];

  // Boucle sur chaque recette
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Vérifier si la recette correspond au terme de recherche
    const matchesSearch =
      !searchValue || // Si searchValue est vide, on ne filtre pas sur la recherche
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((i) =>
        i.ingredient.toLowerCase().includes(searchLower)
      );

    // Vérifier si la recette correspond à tous les tags sélectionnés (seulement si selectedTags est défini)
    let matchesTags = true;
    if (selectedTags && selectedTags.length > 0) {
      for (let j = 0; j < selectedTags.length; j++) {
        const tagLower = selectedTags[j].toLowerCase();
        const matchesTag =
          recipe.ingredients.some((i) => i.ingredient.toLowerCase() === tagLower) ||
          recipe.appliance.toLowerCase() === tagLower ||
          recipe.ustensils.some((u) => u.toLowerCase() === tagLower);

        // Si un tag ne correspond pas, on marque matchesTags comme false
        if (!matchesTag) {
          matchesTags = false;
          break; // Si un tag ne correspond pas, on arrête de vérifier les autres
        }
      }
    }

    // Si la recette correspond à la recherche et aux tags sélectionnés (si applicable), on l'ajoute au tableau des résultats
    if (matchesSearch && matchesTags) {
      filteredRecipes.push(recipe);
    }
  }

  return filteredRecipes;
}
