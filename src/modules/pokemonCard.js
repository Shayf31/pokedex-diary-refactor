export function createPokemonObject(currentPokemon, typeColors) {
  const name =
    currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);

  const id = currentPokemon.id;
  const idString = "#" + String(id).padStart(3, "0");

  const type1 = currentPokemon.types[0].type.name;
  const type2 = currentPokemon.types[1]?.type.name;

  return {
    id,
    idString,
    name,
    sprite: currentPokemon.sprites.front_default,
    types: [type1, type2].filter(Boolean),
    type1Color: typeColors[type1],
    type2Color: typeColors[type2],
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

export function createPokemonCard(pokemon, showCatchButton = false) {
  const type2HTML = pokemon.types[1]
    ? `<span class="${pokemon.type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[1]}</span>`
    : "";

  const catchButtonHTML = showCatchButton
    ? `<button id="catchBtn-${pokemon.id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Catch'em!</button>`
    : "";

  return `
    <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div class="bg-slate-100 h-60 flex items-center justify-center">
        <img src="${pokemon.sprite}" alt="${pokemon.name}" class="w-36 h-36 object-contain" />
      </div>

      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-extrabold">${pokemon.name}</h2>
          <span class="text-slate-400 text-2xl font-semibold">${pokemon.idString}</span>
        </div>

        <div class="flex gap-3 mb-5">
          <span class="${pokemon.type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[0]}</span>
          ${type2HTML}
        </div>

        <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
          <p class="flex justify-between"><span class="text-slate-500">Hp:</span> <span class="font-bold">${pokemon.stats.hp}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Speed:</span> <span class="font-bold">${pokemon.stats.speed}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Attack:</span> <span class="font-bold">${pokemon.stats.attack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Defense:</span> <span class="font-bold">${pokemon.stats.defense}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${pokemon.stats.specialAttack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${pokemon.stats.specialDefense}</span></p>
        </div>

        ${catchButtonHTML}
      </div>
    </article>
  `;
}