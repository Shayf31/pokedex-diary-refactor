// Import Tailwind/CSS styles for the homepage
import "./index.css";

// Import API helper functions for fetching Pokémon data
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonByNameOrId,
} from "./modules/api.js";

// Import shared constants and card creation helpers
import { typeColors } from "./modules/constants.js";
import {
  createPokemonObject,
  createPokemonCard,
} from "./modules/pokemonCard.js";

// Import localStorage helper for catching Pokémon
import { catchPokemon } from "./modules/storage.js";

// Main container where Pokémon cards will be rendered
const pokemonContainer = document.getElementById("pokemonContainer");

// Search and dialog elements from the homepage HTML
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchDialog = document.getElementById("searchDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogBtn = document.getElementById("closeDialogBtn");

// Loads the homepage Pokémon grid
async function init() {
  // Fetch the first 151 Pokémon from the API
  const list = await fetchPokemonList();

  // Store formatted Pokémon objects so we can attach catch button events later
  const pokemonObjects = [];

  let html = "";

  // Fetch detailed data for each Pokémon and build the card HTML
  for (const pokemon of list) {
    const data = await fetchPokemonDetails(pokemon.url);
    const pokemonObject = createPokemonObject(data, typeColors);

    pokemonObjects.push(pokemonObject);
    html += createPokemonCard(pokemonObject, true);
  }

  // Render all cards at once for better performance
  pokemonContainer.innerHTML = html;

  // Attach catch button events after the cards have been added to the DOM
  for (const pokemon of pokemonObjects) {
    const btn = document.getElementById(`catchBtn-${pokemon.id}`);

    if (btn) {
      btn.addEventListener("click", () => {
        catchPokemon(pokemon);
      });
    }
  }
}

// Handles searching for a Pokémon by name or ID
async function searchPokemon() {
  const searchValue = searchInput.value.trim().toLowerCase();

  // Prevent empty searches
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
    // Fetch one Pokémon and reuse the same object/card helpers as the homepage grid
    const data = await fetchPokemonByNameOrId(searchValue);
    const pokemonObject = createPokemonObject(data, typeColors);

    dialogContent.innerHTML = createPokemonCard(pokemonObject, false);
    searchDialog.showModal();
  } catch (error) {
    // Display a friendly message if the API cannot find the Pokémon
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

// Search button click event
searchBtn.addEventListener("click", searchPokemon);

// Allow users to search by pressing Enter inside the input
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

// Close the search result dialog
closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});

// Start the homepage app
init();