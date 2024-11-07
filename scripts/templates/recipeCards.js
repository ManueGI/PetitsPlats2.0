export function createRecipeCard(recipe) {
  return `
    <div class="card bg-white shadow-xl rounded-2xl w-[380px] h-[730px] overflow-hidden relative">
      <img src="./assets/recettes/${recipe.image}" alt="${recipe.name}" class="w-full h-[250px] object-cover m-0 p-0">
      <div class="p-6">
        <h2 class="text-lg font-bold font-anton mb-6 mt-1">${recipe.name}</h2>
        <p class="text-gray-600 text-xs mb-6">RECETTE</p>
        <p class="h-[85px] multiline-ellipsis text-sm mb-7">${recipe.description}</p>
         <p class="text-gray-600 text-xs mb-6">INGREDIENTS</p>
        <ul class="mt-2 grid grid-cols-2 w-full">
          ${recipe.ingredients.map(ingredient => `
            <li class="mb-6">
            <p class=" text-sm"> ${ingredient.ingredient}</p>
            <p class="text-gray-600  text-sm">${ingredient.quantity || ''} ${ingredient.unit || ''}</p>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="absolute top-5 right-5 bg-amber-300 rounded-xl">
      <p class="text-sm mx-2 my-1"> ${recipe.time}min</p>
      </div>
    </div>
  `;
}
