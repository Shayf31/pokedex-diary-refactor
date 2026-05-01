// Retrieves the list of caught Pokémon from localStorage
// If nothing is stored yet, return an empty array
export function getCaughtPokemon() {
  return JSON.parse(localStorage.getItem("caughtPokemon") || "[]");
}

// Saves the updated Pokémon list back to localStorage
// This ensures the data persists after page refresh
export function saveCaughtPokemon(pokemonList) {
  localStorage.setItem("caughtPokemon", JSON.stringify(pokemonList));
}

// Handles catching a Pokémon from the homepage
// Adds the Pokémon to localStorage if it hasn't already been caught
export function catchPokemon(pokemonObject) {
  const caughtList = getCaughtPokemon();

  // Check if the Pokémon is already in the caught list to prevent duplicates
  const alreadyCaught = caughtList.some(
    (pokemon) => pokemon.id === pokemonObject.id
  );

  if (alreadyCaught) {
    alert("You already caught " + pokemonObject.name + "!");
    return;
  }

  // Add the new Pokémon and save updated list
  caughtList.push(pokemonObject);
  saveCaughtPokemon(caughtList);

  alert("You successfully caught " + pokemonObject.name + "!");
}

// Removes a Pokémon from the caught list (used in the Pokédex page)
export function releasePokemon(id) {
  const caughtList = getCaughtPokemon();

  // Filter out the Pokémon with the matching ID
  const updatedList = caughtList.filter(
    (pokemon) => pokemon.id !== id
  );

  saveCaughtPokemon(updatedList);
}

// Saves or updates a personal note for a specific Pokémon
export function savePokemonNote(id, noteValue) {
  const caughtList = getCaughtPokemon();

  // Find the matching Pokémon and update its note property
  caughtList.forEach((pokemon) => {
    if (pokemon.id === id) {
      pokemon.note = noteValue;
    }
  });

  // Save updated list back to localStorage
  saveCaughtPokemon(caughtList);
}