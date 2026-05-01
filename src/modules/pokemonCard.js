// Transforms raw Pokémon API data into a simplified object
// This makes it easier to work with when rendering UI or saving data
export function createPokemonObject(currentPokemon, typeColors) {
  // Format Pokémon name (capitalize first letter)
  const name =
    currentPokemon.name.charAt(0).toUpperCase() +
    currentPokemon.name.slice(1);

  // Extract ID and format it as "#001", "#025", etc.
  const id = currentPokemon.id;
  const idString = "#" + String(id).padStart(3, "0");

  // Extract Pokémon types (some Pokémon only have one type)
  const type1 = currentPokemon.types[0].type.name;
  const type2 = currentPokemon.types[1]?.type.name;

  // Return a clean, reusable Pokémon object
  return {
    id,
    idString,
    name,
    sprite:
  currentPokemon.sprites.other["official-artwork"].front_default ||
  currentPokemon.sprites.front_default,

    // Store types and remove undefined values if only one type exists
    types: [type1, type2].filter(Boolean),

    // Map types to their corresponding Tailwind color classes
    type1Color: typeColors[type1],
    type2Color: typeColors[type2],

    // Extract key stats from the API response
    stats: {
      hp: currentPokemon.stats[0].base_stat,
      attack: currentPokemon.stats[1].base_stat,
      defense: currentPokemon.stats[2].base_stat,
      specialAttack: currentPokemon.stats[3].base_stat,
      specialDefense: currentPokemon.stats[4].base_stat,
      speed: currentPokemon.stats[5].base_stat,
    },
  };
}

// Generates the HTML markup for a Pokémon card
// showCatchButton controls whether the "Catch" button is displayed
export function createPokemonCard(pokemon, showCatchButton = false) {
  // Conditionally render second type badge if it exists
  const type2HTML = pokemon.types[1]
    ? `<span class="${pokemon.type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[1]}</span>`
    : "";

  // Conditionally render "Catch" button (used on homepage only)
  const catchButtonHTML = showCatchButton
    ? `<button id="catchBtn-${pokemon.id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Catch'em!</button>`
    : "";

  // Return full card HTML as a template string
  return `
    <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
      <!-- Pokémon Image -->
      <div class="bg-slate-100 h-60 flex items-center justify-center">
        <img src="${pokemon.sprite}" alt="${pokemon.name}" class="w-36 h-36 object-contain" />
      </div>

      <div class="p-6">
        <!-- Name and ID -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-extrabold">${pokemon.name}</h2>
          <span class="text-slate-400 text-2xl font-semibold">${pokemon.idString}</span>
        </div>

        <!-- Type badges -->
        <div class="flex gap-3 mb-5">
          <span class="${pokemon.type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[0]}</span>
          ${type2HTML}
        </div>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
          <p class="flex justify-between"><span class="text-slate-500">Hp:</span> <span class="font-bold">${pokemon.stats.hp}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Speed:</span> <span class="font-bold">${pokemon.stats.speed}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Attack:</span> <span class="font-bold">${pokemon.stats.attack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Defense:</span> <span class="font-bold">${pokemon.stats.defense}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${pokemon.stats.specialAttack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${pokemon.stats.specialDefense}</span></p>
        </div>

        <!-- Optional Catch Button -->
        ${catchButtonHTML}
      </div>
    </article>
  `;
}