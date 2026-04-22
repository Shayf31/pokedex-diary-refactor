const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const searchDialog = document.getElementById("searchDialog");
const closeDialogBtn = document.getElementById("closeDialogBtn");
const dialogContent = document.getElementById("dialogContent");
const allKantoPokemonPath = "https://pokeapi.co/api/v2/pokemon?limit=151";
const pokemonContainer = document.getElementById("pokemonContainer");

async function getAllKantoPokemon() {
    const response = await fetch(allKantoPokemonPath);
    const allKantoPokemonData = await response.json();
    const allKantoPokemon = allKantoPokemonData.results;

    let html = "";

    for (const pokemon of allKantoPokemon) {
        const pokemonInfoResponse = await fetch(pokemon.url);
        const pokemonInfo = await pokemonInfoResponse.json();

        const name = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1);
        const id = '#' + String(pokemonInfo.id).padStart(3, "0");;
        const type1 = pokemonInfo.types[0].type.name;
        const type2 = pokemonInfo.types[1]?.type.name;
        const sprite = pokemonInfo.sprites.front_default;
        const hp = pokemonInfo.stats[0].base_stat;
        const attack = pokemonInfo.stats[1].base_stat;
        const defense = pokemonInfo.stats[2].base_stat;
        const specialAttack = pokemonInfo.stats[3].base_stat;
        const specialDefense = pokemonInfo.stats[4].base_stat;
        const speed = pokemonInfo.stats[5].base_stat;
        
        const type2HTML = type2
            ? `<span class="bg-yellow-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-full">${type2}</span>`
            : "";

        html += `
          <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div class="bg-slate-100 h-60 flex items-center justify-center">
              <img src="${sprite}" alt="${name}" class="w-36 h-36 object-contain" />
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-extrabold">${name}</h2>
                <span class="text-slate-400 text-2xl font-semibold">${id}</span>
              </div>

              <div class="flex gap-3 mb-5">
                <span class="bg-yellow-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-full">${type1}</span>
                ${type2HTML}
              </div>

              <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
                <p><span class="text-slate-500">Hp:</span> <span class="font-bold">${hp}</span></p>
                <p><span class="text-slate-500">Speed:</span> <span class="font-bold">${speed}</span></p>
                <p><span class="text-slate-500">Attack:</span> <span class="font-bold">${attack}</span></p>
                <p><span class="text-slate-500">Defense:</span> <span class="font-bold">${defense}</span></p>
                <p><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${specialAttack}</span></p>
                <p><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${specialDefense}</span></p>
              </div>
            </div>
          </article>`;
    };
    pokemonContainer.innerHTML = html;
};

getAllKantoPokemon();

searchBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();

    if (!value) {
        dialogContent.textContent = "Please enter a Pokemon name or ID.";
        searchDialog.showModal();
        return;
    }

    dialogContent.textContent = `You searched for: ${value}`;
    searchDialog.showModal();
});

closeDialogBtn.addEventListener("click", () => {
    searchDialog.close();
});
