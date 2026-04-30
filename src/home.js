import "./index.css";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonByNameOrId,
} from "./modules/api.js";
import { typeColors } from "./modules/constants.js";
import {
  createPokemonObject,
  createPokemonCard,
} from "./modules/pokemonCard.js";
import { catchPokemon } from "./modules/storage.js";

// MAIN CONTAINER
const pokemonContainer = document.getElementById("pokemonContainer");

// SEARCH ELEMENTS
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchDialog = document.getElementById("searchDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogBtn = document.getElementById("closeDialogBtn");

// INITIAL LOAD (HOMEPAGE GRID)
async function init() {
  const list = await fetchPokemonList();
  const pokemonObjects = [];

  let html = "";

  for (const pokemon of list) {
    const data = await fetchPokemonDetails(pokemon.url);
    const pokemonObject = createPokemonObject(data, typeColors);

    pokemonObjects.push(pokemonObject);
    html += createPokemonCard(pokemonObject, true);
  }

  pokemonContainer.innerHTML = html;

  // CATCH BUTTON EVENTS
  for (const pokemon of pokemonObjects) {
    const btn = document.getElementById(`catchBtn-${pokemon.id}`);

    if (btn) {
      btn.addEventListener("click", () => {
        catchPokemon(pokemon);
      });
    }
  }
}

// SEARCH FUNCTION
async function searchPokemon() {
  const searchValue = searchInput.value.trim().toLowerCase();

  if (!searchValue) {
    dialogContent.innerHTML = `
      <div class="p-4 text-center">
        <p class="text-xl text-red-500 font-bold">
          Please enter a Pokémon name or ID.
        </p>
      </div>
    `;
    searchDialog.showModal();
    return;
  }

  try {
    const data = await fetchPokemonByNameOrId(searchValue);
    const pokemonObject = createPokemonObject(data, typeColors);

    dialogContent.innerHTML = createPokemonCard(pokemonObject, false);

    searchDialog.showModal();
  } catch (error) {
    dialogContent.innerHTML = `
      <div class="p-6 text-center">
        <h3 class="text-2xl font-extrabold text-red-500 mb-3">
          No Pokémon Found
        </h3>
        <p class="text-lg text-slate-600">
          We could not find:
          <span class="font-bold">${searchValue}</span>
        </p>
      </div>
    `;

    searchDialog.showModal();
  }
}

// SEARCH EVENTS
searchBtn.addEventListener("click", searchPokemon);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});

// START APP
init();