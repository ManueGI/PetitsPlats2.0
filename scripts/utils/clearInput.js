// Fonction pour vider l'input
export function clearInput(menuId, inputField, closeButton) {
  // const inputField = document.getElementById(`input-${menuId}`);
  // const closeButton = document.getElementById(`btn-${menuId}-close`);
  inputField.value = "";
  closeButton.classList.add("hidden");
}
