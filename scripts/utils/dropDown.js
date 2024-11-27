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
export function populateDropdown(menuId, title, keywords) {
  const dropdownMenu = document.getElementById(`dropdown-menu-${menuId}`);
  dropdownMenu.innerHTML = `
    <div class="sticky top-0 bg-white z-10">
      <!-- Titre et Chevron -->
      <div class="flex justify-between items-center">
        <span>${title}</span>
        <em class="fa-solid fa-chevron-up"></em>
      </div>
      <!-- Input et Boutons -->
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
    <!-- Liste défilable -->
    <div class="h-48 overflow-y-scroll z-50 scroll-bar-hidden w-full">
      <ul class="mt-2 w-full">
        ${keywords
          .map(
            (keyword) =>
              `<li class="text-sm hover:bg-gray-100 p-2 cursor-pointer w-full" data-keyword="${keyword}">${keyword}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;
    // Attacher un événement à chaque élément de la liste
    const items = dropdownMenu.querySelectorAll("li");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        addTag(item.dataset.keyword);
      });
    });

    const inputField = document.getElementById(`input-${menuId}`);
    const closeButton = document.getElementById(`btn-${menuId}-close`);
    inputField.addEventListener("input", () => {
      handleInputChange(inputField, closeButton)
    })
    closeButton.addEventListener("click", () => {
      clearInput(menuId)
    })
  }

  // Fonction pour gérer l'ajout d'un tag et afficher dans la console
  function addTag(keyword) {
    console.log(`addTag: ${keyword}`);

}

// Fonction pour gérer l'entrée de l'utilisateur et afficher/masquer le bouton de fermeture
function handleInputChange(inputField, closeButton) {

  // Si l'input est vide, cacher le bouton de fermeture, sinon afficher
  if (inputField.value.trim() === "") {
    closeButton.classList.add("hidden");
  } else {
    closeButton.classList.remove("hidden");
  }
}

// Fonction pour vider l'input lorsque l'utilisateur clique sur le bouton de fermeture
function clearInput(menuId) {
  const inputField = document.getElementById(`input-${menuId}`);
  const closeButton = document.getElementById(`btn-${menuId}-close`);

  // Vider l'input et cacher le bouton de fermeture
  inputField.value = "";
  closeButton.classList.add("hidden");
}

// Fonction pour afficher ou cacher un menu déroulant
export function toggleDropdown(type) {
  const dropdownMenu = document.getElementById(`dropdown-menu-${type}`);
  closeAllDropdowns();
  dropdownMenu.classList.remove("hidden");
}

// Fonction pour fermer tous les menus
function closeAllDropdowns() {
  const allMenus = document.querySelectorAll('[id^="dropdown-menu-"]');
  allMenus.forEach(menu => {
    menu.classList.add("hidden");
  });
}

// Fonction pour fermer le dropdown quand on clique en dehors
document.addEventListener("click", function (event) {
  const allButtons = document.querySelectorAll('[id$="-button"]');
  const allMenus = document.querySelectorAll('[id^="dropdown-menu-"]');
  allButtons.forEach((button, index) => {
    const menu = allMenus[index];
    if (
      !button.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      if (!menu.classList.contains("hidden")) {
        menu.classList.add("hidden");
        console.log(menu)
      }
    }
  });
});


// Fonction pour filtrer le dropdown en fonction du terme de recherche
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
