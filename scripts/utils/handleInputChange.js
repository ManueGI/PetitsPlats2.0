// Fonction pour gérer l'entrée utilisateur et afficher/masquer le bouton de fermeture
export function handleInputChange(inputField, closeButton) {
  if (inputField.value.trim() === "") {
    closeButton.classList.add("hidden");
  } else {
    closeButton.classList.remove("hidden");
  }
}
