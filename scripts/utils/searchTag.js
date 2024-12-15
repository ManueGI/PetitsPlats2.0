export function searchTag(tags, searchValue) {
  const searchLower = searchValue ? searchValue.toLowerCase() : '';
  const filteredTags = [];

  // Boucle sur chaque recette
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    // Vérifier si la recette correspond au terme de recherche
    const matchesSearch =
      !searchValue || // Si searchValue est vide, on ne filtre pas sur la recherche
      tag.toLowerCase().includes(searchLower);

    // Si la recette correspond à la recherche et aux tags sélectionnés (si applicable), on l'ajoute au tableau des résultats
    if (matchesSearch) {
      filteredTags.push(tag);
    }
  }

  return filteredTags;
}
