const fetchPokemonPath = "https://pokeapi.co/api/v2/pokemon?limit=151";
const pokemonContainer = document.getElementById("pokemonContainer");
const pokemonObjects = [];
const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-300",
  fighting: "bg-red-600",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-violet-600",
  dark: "bg-gray-700",
  steel: "bg-slate-400",
  fairy: "bg-pink-300",
};

// variables for search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchDialog = document.getElementById("searchDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogBtn = document.getElementById("closeDialogBtn");

async function fetchPokemon() {
  // fetch pokemon data from the api
  const response = await fetch(fetchPokemonPath);
  const data = await response.json();
  const pokemonData = data.results;

  // empty variable for storing all pokemon cards
  let html = "";

  // loop through each pokemon entry and fetch each pokemons individual info
  for (const pokemon of pokemonData) {
    const response = await fetch(pokemon.url);
    const currentPokemon = await response.json();

    const name =
      currentPokemon.name.charAt(0).toUpperCase() +
      currentPokemon.name.slice(1);

    // pad the id with leading zeros so it always shows as 3 digits e.g. #001
    const id = currentPokemon.id;
    const idString = "#" + String(id).padStart(3, "0");
    const type1 = currentPokemon.types[0].type.name;

    // optional chaining (?.) avoids an error if a pokemon only has one type
    const type2 = currentPokemon.types[1]?.type.name;
    const type1Color = typeColors[type1];
    const type2Color = typeColors[type2];
    const sprite = currentPokemon.sprites.front_default;
    const hp = currentPokemon.stats[0].base_stat;
    const attack = currentPokemon.stats[1].base_stat;
    const defense = currentPokemon.stats[2].base_stat;
    const specialAttack = currentPokemon.stats[3].base_stat;
    const specialDefense = currentPokemon.stats[4].base_stat;
    const speed = currentPokemon.stats[5].base_stat;

    // populate pokemonObjects array with pokemon data as object for later use
    pokemonObjects.push({
      id: id,
      idString: idString,
      name: name,
      sprite: sprite,
      types: [type1, type2].filter(Boolean),
      type1Color: type1Color,
      type2Color: type2Color,
      stats: {
        hp: hp,
        attack: attack,
        defense: defense,
        specialAttack: specialAttack,
        specialDefense: specialDefense,
        speed: speed,
      },
    });

    // only render the second type badge if a second type exists
    const type2HTML = type2
      ? `<span class="${type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type2}</span>`
      : "";

    // build the full html string first, then write to the DOM once at the end
    html += `
          <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div class="bg-slate-100 h-60 flex items-center justify-center">
              <img src="${sprite}" alt="${name}" class="w-36 h-36 object-contain" />
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-extrabold">${name}</h2>
                <span class="text-slate-400 text-2xl font-semibold">${idString}</span>
              </div>

              <div class="flex gap-3 mb-5">
                <span class="${type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type1}</span>
                ${type2HTML}
              </div>

              <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
                <p class="flex justify-between"><span class="text-slate-500">Hp:</span> <span class="font-bold">${hp}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Speed:</span> <span class="font-bold">${speed}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Attack:</span> <span class="font-bold">${attack}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Defense:</span> <span class="font-bold">${defense}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${specialAttack}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${specialDefense}</span></p>
              </div>
              <button id="catchBtn-${id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Catch'em!</button>
            </div>
          </article>`;
  }

  // write the full html string to the DOM
  pokemonContainer.innerHTML = html;

  // add eventlistener to each catch button
  for (const pokemonObject of pokemonObjects) {
    const btn = document.getElementById(`catchBtn-${pokemonObject.id}`);
    btn.addEventListener("click", () => {

      // get existing caught pokemon from localStorage or an empty array if nothing is stored yet
      const caughtList = JSON.parse(
        localStorage.getItem("caughtPokemon") || "[]",
      );

      // check if the pokemon is already caught to prevent duplicates
      const alreadyCaught = caughtList.some((pokemon) => pokemon.id === pokemonObject.id);

      // add pokemon object to local storage
      if (!alreadyCaught) {
        caughtList.push(pokemonObject);
        localStorage.setItem("caughtPokemon", JSON.stringify(caughtList));
      }
    });
  }
};

// search function + Repeated data extraction block - don't mess with Jeronimos code
// grab the search and dialog elements from HTML
// create a new searchPokemon() function
// get the user’s input
// fetch one Pokemon by name or ID
// put that result inside the modal
// handle empty input
// handle not-found searches
// wire up the button, Enter key, and close button

async function searchPokemon() {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (!searchValue) {
    dialogContent.innerHTML = `
          <div class="p-4 text-center">
            <p class="text-xl text-red-500 font-bold">Please enter a Pokémon name or ID.</p>
          </div>
        `;
    searchDialog.showModal();
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue}`,
    );

    if (!response.ok) {
      throw new Error("Pokemon not found");
    }

    const currentPokemon = await response.json();

    const name =
      currentPokemon.name.charAt(0).toUpperCase() +
      currentPokemon.name.slice(1);
    const id = "#" + String(currentPokemon.id).padStart(3, "0");
    const type1 = currentPokemon.types[0].type.name;
    const type2 = currentPokemon.types[1]?.type.name;
    const type1Color = typeColors[type1];
    const type2Color = typeColors[type2];
    const sprite = currentPokemon.sprites.front_default;
    const hp = currentPokemon.stats[0].base_stat;
    const attack = currentPokemon.stats[1].base_stat;
    const defense = currentPokemon.stats[2].base_stat;
    const specialAttack = currentPokemon.stats[3].base_stat;
    const specialDefense = currentPokemon.stats[4].base_stat;
    const speed = currentPokemon.stats[5].base_stat;

    const type2HTML = type2
      ? `<span class="${type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type2}</span>`
      : "";

    dialogContent.innerHTML = `
          <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div class="bg-slate-100 h-60 flex items-center justify-center">
              <img src="${sprite}" alt="${name}" class="w-36 h-36 object-contain mx-auto" />
            </div>

            <div class="p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-extrabold">${name}</h2>
                <span class="text-slate-400 text-2xl font-semibold">${id}</span>
              </div>

              <div class="flex gap-3 mb-5">
                <span class="${type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${type1}</span>
                ${type2HTML}
              </div>

              <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
                <p class="flex justify-between"><span class="text-slate-500">Hp:</span> <span class="font-bold">${hp}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Speed:</span> <span class="font-bold">${speed}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Attack:</span> <span class="font-bold">${attack}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Defense:</span> <span class="font-bold">${defense}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${specialAttack}</span></p>
                <p class="flex justify-between"><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${specialDefense}</span></p>
              </div>
            </div>
          </article>
        `;

    searchDialog.showModal();
  } catch (error) {
    dialogContent.innerHTML = `
          <div class="p-6 text-center">
            <h3 class="text-2xl font-extrabold text-red-500 mb-3">No Pokémon Found</h3>
            <p class="text-lg text-slate-600">
              We could not find a Pokémon with name or ID:
              <span class="font-bold">${searchValue}</span>
            </p>
          </div>
        `;
    searchDialog.showModal();
  }
}

// EVENT LISTENERS FOR SEARCH
searchBtn.addEventListener("click", searchPokemon);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});

fetchPokemon();


///////
localStorage.setItem("caughtPokemon", JSON.stringify(caughtList));