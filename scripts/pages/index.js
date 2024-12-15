import { createRecipeCard } from "../templates/recipeCards.js";
import {
  extractUniqueKeywords,
  populateDropdown,
  toggleDropdown,
} from "../utils/dropDown.js";
import { recipes } from "../../data/recipes.js";
import { searchRecipe } from "../utils/searchRecipe.js";
import { clearInput } from "../utils/clearInput.js";
import { handleInputChange } from "../utils/handleInputChange.js";

let selectedTags = []; // Liste des tags sélectionnés
export function displayRecipesPage() {
  const inputSearch = document.getElementById("input-search");
  const closeButton = document.getElementById(`btn-search-close`);
  const container = document.getElementById("recipe-cards");

  // Fonction pour mettre à jour les recettes affichées
  function updateRecipes() {
    let searchValue = inputSearch.value.trim();
    if (searchValue.length < 3) {
      searchValue = ""; // Annule la recherche
    }
    const filteredRecipes = searchRecipe(recipes, searchValue, selectedTags);

    // Met à jour le contenu du span avec le nombre de recettes filtrées
    const recipesCount = document.getElementById("recipe-count-number");
    recipesCount.textContent = filteredRecipes.length;

   // Si aucune recette n'est trouvée
  if (filteredRecipes.length === 0) {
    // Créer le message "Aucune recette correspondante trouvée"
    const noRecipesMessage = document.createElement('p');
    noRecipesMessage.textContent = 'Aucune recette correspondante trouvée';
    noRecipesMessage.classList.add('text-center', 'font-bold', 'text-xl', 'w-full', 'h-52');

    // Ajouter ce message au conteneur de recettes
    container.innerHTML = ''; // Vider le conteneur des recettes
    container.appendChild(noRecipesMessage);
  } else {
    // Si des recettes sont trouvées, afficher les recettes
    container.innerHTML = filteredRecipes
      .map((recipe) => createRecipeCard(recipe))
      .join("");
  }
  }

  // Fonction pour gérer les tags sélectionnés
  function addSelectedTags(tag) {
    // Vérifier si le tag est déjà sélectionné pour éviter les doublons
    if (selectedTags.includes(tag)) return;

    // Ajouter le tag à la liste des tags sélectionnés
    selectedTags.push(tag);

    // Créer un élément pour afficher le tag
    const tagContainer = document.createElement("div");
    tagContainer.className = "bg-amber-300 rounded-lg p-4 flex mr-4";
    tagContainer.setAttribute("data-tag", tag);

    // Ajouter le texte du tag
    const tagText = document.createElement("p");
    tagText.textContent = tag;

    // Bouton de suppression
    const deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.className = "flex h-3 w-3 justify-center ml-4";

    const deleteButton = document.createElement("button");
    deleteButton.className = "";
    deleteButton.innerHTML =
      '<em class="fa-solid fa-xmark text-black text-[20px]"></em>';
    deleteButton.addEventListener("click", () => removeSelectedTag(tag));

    deleteButtonContainer.appendChild(deleteButton);

    // Ajouter le texte et le bouton au conteneur
    tagContainer.appendChild(tagText);
    tagContainer.appendChild(deleteButtonContainer);

    // Ajouter le conteneur du tag à la div `selected-tags`
    const selectedTagsDiv = document.getElementById("selected-tags");
    selectedTagsDiv.appendChild(tagContainer);

    // Rafraîchir l'affichage des recettes
    updateRecipes();
  }

  function removeSelectedTag(tag) {
    // Supprimer le tag de la liste des tags sélectionnés
    selectedTags = selectedTags.filter((t) => t !== tag);

    // Supprimer l'élément visuel du tag
    const tagElement = document.querySelector(`[data-tag="${tag}"]`);
    if (tagElement) {
      tagElement.remove();
    }

    // Rafraîchir l'affichage des recettes
    updateRecipes();
  }

  // Gérer les événements de l'input
  inputSearch.addEventListener("input", () => {
    handleInputChange(inputSearch, closeButton); // Met à jour l'état de l'input et du bouton
    updateRecipes(); // Filtre les recettes en fonction de l'input
  });

  // Gérer l'effacement de l'input
  closeButton.addEventListener("click", () => {
    clearInput("search", inputSearch, closeButton); // Réinitialise l'input
    updateRecipes(); // Rafraîchit les recettes avec l'input vide
  });

  // Afficher les recettes initiales
  updateRecipes();

  // Gérer les événements des dropdowns
  document.getElementById("ingredient-search").addEventListener("click", () => {
    toggleDropdown("ingredient");
  });
  document.getElementById("appliance-search").addEventListener("click", () => {
    toggleDropdown("appliance");
  });
  document.getElementById("utensil-search").addEventListener("click", () => {
    toggleDropdown("utensil");
  });

  // Extraire les mots-clés uniques
  const ingredientKeywords = extractUniqueKeywords(recipes, "ingredient");
  const applianceKeywords = extractUniqueKeywords(recipes, "appliance");
  const utensilKeywords = extractUniqueKeywords(recipes, "utensil");

  // Peupler les dropdowns
  populateDropdown(
    "ingredient",
    "Ingrédients",
    ingredientKeywords.sort(),
    addSelectedTags
  );
  populateDropdown(
    "appliance",
    "Appareils",
    applianceKeywords.sort(),
    addSelectedTags
  );
  populateDropdown(
    "utensil",
    "Ustensiles",
    utensilKeywords.sort(),
    addSelectedTags
  );
}
