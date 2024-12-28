export function searchRecipe(recipes, searchValue, selectedTags) {
  const searchLower = searchValue.toLowerCase();


  return recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.description.toLowerCase().includes(searchLower) ||
      recipe.ingredients.some((i) =>
        i.ingredient.toLowerCase().includes(searchLower)
      );


    const matchesTags = selectedTags.every((tag) => {
      const tagLower = tag.toLowerCase();
      return (
        recipe.ingredients.some((i) => i.ingredient.toLowerCase() === tagLower) ||
        recipe.appliance.toLowerCase() === tagLower ||
        recipe.ustensils.some((u) => u.toLowerCase() === tagLower)
      );
    });


    return matchesSearch && matchesTags;
  });
}
