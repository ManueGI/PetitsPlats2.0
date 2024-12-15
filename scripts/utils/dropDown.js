import { clearInput } from "./clearInput.js";
import { handleInputChange } from "./handleInputChange.js";
import { searchTag } from "./searchTag.js";

// Fonction pour extraire les mots-clés uniques
export function extractUniqueKeywords(recipes, type) {
  const keywords = recipes.flatMap((recipe) => {
    if (type === "ingredient")
      return recipe.ingredients.map((i) => i.ingredient.toLowerCase());
    if (type === "appliance") return [recipe.appliance.toLowerCase()];
    if (type === "utensil") return recipe.ustensils.map((u) => u.toLowerCase());
    return [];
  });
  return [...new Set(keywords)];
}

// Fonction pour peupler le dropdown
export function populateDropdown(menuId, title, keywords, addSelectedTags) {
  const dropdownMenu = document.getElementById(`dropdown-menu-${menuId}`);
  let tags = keywords;
  dropdownMenu.innerHTML = `
    <div class="sticky top-0 bg-white z-10">
      <div class="flex justify-between items-center">
        <span>${title}</span>
        <em class="fa-solid fa-chevron-up"></em>
      </div>
      <div class="border-2 border-gray-200 flex justify-between items-center rounded my-3 overflow-hidden relative px-2 py-1">
        <input
          type="text"
          id="input-${menuId}"
          class="focus:outline-none w-full m-1 text-gray-400"
          placeholder="Rechercher..."
        />
        <button
          class="rounded-md h-4 w-4 mr-2 flex justify-center items-center"
          id="btn-${menuId}"
        >
          <em class="fa-solid fa-magnifying-glass text-gray-400 text-[12px]"></em>
        </button>
        <button
          class="hidden rounded-md h-4 w-4 mr-2 absolute right-5 top-[15%]"
          id="btn-${menuId}-close"
        >
          <em class="fa-solid fa-xmark text-gray-400 text-[12px]"></em>
        </button>
      </div>
    </div>
    <div class="h-48 overflow-y-scroll z-50 scroll-bar-hidden w-full">
      <ul class="mt-2 w-full">
        ${tags
          .map(
            (tag) =>
              `<li class="text-sm hover:bg-amber-300 p-2 cursor-pointer w-full" data-keyword="${tag}">${tag}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;

  // Attacher un événement à chaque élément de la liste
  const items = dropdownMenu.querySelectorAll("li");
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const keyword = item.dataset.keyword;
      addSelectedTags(keyword); // Appel de la fonction pour ajouter/supprimer le tag
    });
  });

  // Fonction pour mettre à jour les recettes affichées
  function updateTags() {
    let searchValue = inputField.value.trim();

    const filteredTags = searchTag(keywords, searchValue);
    tags = filteredTags;

    // Réinjecter les tags filtrés dans le dropdown
    const tagList = dropdownMenu.querySelector("ul");
    tagList.innerHTML = tags
      .map(
        (tag) =>
          `<li class="text-sm hover:bg-amber-300 p-2 cursor-pointer w-full" data-keyword="${tag}">${tag}</li>`
      )
      .join("");

    // Réattacher les événements aux nouveaux items
    const items = dropdownMenu.querySelectorAll("li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        const keyword = item.dataset.keyword;
        addSelectedTags(keyword); // Appel de la fonction pour ajouter/supprimer le tag
      });
    });
  }

  const inputField = document.getElementById(`input-${menuId}`);
  const closeButton = document.getElementById(`btn-${menuId}-close`);
  inputField.addEventListener("input", () => {
    handleInputChange(inputField, closeButton);
    updateTags(tags);
  });
  closeButton.addEventListener("click", () => {
    clearInput(menuId, inputField, closeButton);
    updateTags(tags);
  });

  function updateSelectedTags(tag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag); // Supprimer le tag
    } else {
      selectedTags.push(tag); // Ajouter le tag
    }
    updateRecipes(); // Rafraîchir l'affichage
  }
}

// Fonction pour filtrer les items du dropdown
export function filterDropdown(menuId, searchTerm) {
  const dropdownMenu = document.getElementById(menuId);
  const items = dropdownMenu.querySelectorAll("ul li");
  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchTerm.toLowerCase())
      ? "block"
      : "none";
  });
}

// Fonction pour afficher ou cacher un menu déroulant
export function toggleDropdown(type) {
  const dropdownMenu = document.getElementById(`dropdown-menu-${type}`);
  const isVisible = !dropdownMenu.classList.contains("hidden");

  // Ferme tous les autres menus
  closeAllDropdowns();

  if (!isVisible) {
    // Ouvre le menu
    dropdownMenu.classList.remove("hidden");

    // Ajoute un écouteur pour fermer le menu au clic extérieur
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
  }

  function handleOutsideClick(event) {
    // Vérifie si le clic est à l'extérieur du dropdown
    if (!dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add("hidden");
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  // Empêche la fermeture si l'utilisateur clique à l'intérieur
  dropdownMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

function closeAllDropdowns() {
  const allMenus = document.querySelectorAll('[id^="dropdown-menu-"]');
  allMenus.forEach((menu) => {
    menu.classList.add("hidden");
  });
}
