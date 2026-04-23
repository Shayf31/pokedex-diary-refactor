const favoritesContainer = document.getElementById("favoritesContainer");

function loadPokedex() {
  // get saved pokemon from localStorage
  const favoritePokemon = JSON.parse(
    localStorage.getItem("caughtPokemon") || "[]",
  );

  // if no pokemon are saved, show a message
  if (favoritePokemon.length === 0) {
    favoritesContainer.innerHTML = `
      <div class="col-span-full bg-white rounded-3xl shadow-lg p-10 text-center">
        <h2 class="text-3xl font-extrabold mb-4">No favorite Pokémon yet</h2>
        <p class="text-xl text-slate-500">
          Go to the homepage and catch some Pokémon first.
        </p>
      </div>
    `;
    return;
  }

  let html = "";

  favoritePokemon.forEach((pokemon) => {
    const type2HTML = pokemon.types[1]
      ? `<span class="${pokemon.type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[1]}</span>`
      : "";

    // build the full html string first, then write to the DOM once at the end
    html += `
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
          <button id="releaseBtn-${pokemon.id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Release ${pokemon.name}</button>
        </div>
      </article>`;
  });
  favoritesContainer.innerHTML = html;

  favoritePokemon.forEach((pokemon) => {
    const btn = document.getElementById(`releaseBtn-${pokemon.id}`);
    btn.addEventListener("click", () => {

      // get existing caught pokemon from localStorage or an empty array if nothing is stored yet
      const caughtList = JSON.parse(
        localStorage.getItem("caughtPokemon") || "[]",
      );

      const updatedCaughtList = caughtList.filter((caughtPokemon) => caughtPokemon.id !== pokemon.id);
      localStorage.setItem("caughtPokemon", JSON.stringify(updatedCaughtList));
      loadPokedex();
      alert('You released ' + pokemon.name + '!')
    });
  });
};

loadPokedex();
