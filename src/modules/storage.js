export function getCaughtPokemon() {
  return JSON.parse(localStorage.getItem("caughtPokemon") || "[]");
}

export function saveCaughtPokemon(pokemonList) {
  localStorage.setItem("caughtPokemon", JSON.stringify(pokemonList));
}

export function catchPokemon(pokemonObject) {
  const caughtList = getCaughtPokemon();

  const alreadyCaught = caughtList.some(
    (pokemon) => pokemon.id === pokemonObject.id
  );

  if (alreadyCaught) {
    alert("You already caught " + pokemonObject.name + "!");
    return;
  }

  caughtList.push(pokemonObject);
  saveCaughtPokemon(caughtList);
  alert("You successfully caught " + pokemonObject.name + "!");
}

export function releasePokemon(id) {
  const caughtList = getCaughtPokemon();
  const updatedList = caughtList.filter((pokemon) => pokemon.id !== id);
  saveCaughtPokemon(updatedList);
}

export function savePokemonNote(id, noteValue) {
  const caughtList = getCaughtPokemon();

  caughtList.forEach((pokemon) => {
    if (pokemon.id === id) {
      pokemon.note = noteValue;
    }
  });

  saveCaughtPokemon(caughtList);
}