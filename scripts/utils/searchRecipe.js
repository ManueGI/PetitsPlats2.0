export function searchRecipe(recipes, searchValue, selectedTags) {
  // Convertir la valeur de recherche en minuscules pour permettre une recherche insensible à la casse
  const searchLower = searchValue.toLowerCase();

  // Filtrer les recettes selon la recherche et les tags sélectionnés
  return recipes.filter((recipe) => {
    // Vérifie si la recherche apparaît dans le nom, la description ou dans les ingrédients de la recette
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((i) =>
        i.ingredient.toLowerCase().includes(searchLower)
      );

    // Vérifie si chaque tag sélectionné correspond à un ingrédient, un appareil ou un ustensile de la recette
    const matchesTags = selectedTags.every((tag) => {
      const tagLower = tag.toLowerCase();
      return (
        recipe.ingredients.some((i) => i.ingredient.toLowerCase() === tagLower) ||
        recipe.appliance.toLowerCase() === tagLower ||
        recipe.ustensils.some((u) => u.toLowerCase() === tagLower)
      );
    });

    // Inclut la recette uniquement si elle correspond à la recherche ET à tous les tags sélectionnés
    return matchesSearch && matchesTags;
  });
}
