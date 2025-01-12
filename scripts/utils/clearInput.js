// Fonction pour vider l'input
export function clearInput(menuId, inputField, closeButton) {
  inputField.value = "";
  closeButton.classList.add("hidden");
}
