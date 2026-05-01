// Import Tailwind styles for layout and design
import "./index.css";

// Import API functions used to fetch Pokémon data from PokéAPI
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonByNameOrId,
} from "./modules/api.js";

// Import shared constants and helper functions for building Pokémon cards
import { typeColors } from "./modules/constants.js";
import {
  createPokemonObject,
  createPokemonCard,
} from "./modules/pokemonCard.js";

// Import localStorage helper to handle catching Pokémon
import { catchPokemon } from "./modules/storage.js";

// ==========================
// DOM ELEMENTS
// ==========================

// Main container where all Pokémon cards will be displayed
const pokemonContainer = document.getElementById("pokemonContainer");

// Search input and modal/dialog elements
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchDialog = document.getElementById("searchDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialogBtn = document.getElementById("closeDialogBtn");

// ==========================
// INITIAL LOAD (HOMEPAGE)
// ==========================

// Loads and displays the main Pokémon grid
async function init() {
  try {
    // Fetch list of Pokémon (name + URL)
    const list = await fetchPokemonList();

    // Store processed Pokémon objects for later use (e.g., event listeners)
    const pokemonObjects = [];

    let html = "";

    // Loop through each Pokémon and fetch full details
    for (const pokemon of list) {
      const data = await fetchPokemonDetails(pokemon.url);

      // Convert raw API data into a clean, reusable object
      const pokemonObject = createPokemonObject(data, typeColors);

      // Save for later (used to attach event listeners)
      pokemonObjects.push(pokemonObject);

      // Generate HTML card for each Pokémon
      html += createPokemonCard(pokemonObject, true);
    }

    // Render all cards to the page in one go (better performance)
    pokemonContainer.innerHTML = html;

    // Attach "Catch" button event listeners AFTER rendering
    for (const pokemon of pokemonObjects) {
      const btn = document.getElementById(`catchBtn-${pokemon.id}`);

      if (btn) {
        btn.addEventListener("click", () => {
          catchPokemon(pokemon);
        });
      }
    }
  } catch (error) {
    // Display user-friendly message if API fails (FR009)
    pokemonContainer.innerHTML = `
      <p class="text-center text-red-500 text-xl font-bold">
        Failed to load Pokémon. Please try again later.
      </p>
    `;
  }
}

// ==========================
// SEARCH FUNCTIONALITY
// ==========================

// Handles searching Pokémon by name or ID
async function searchPokemon() {
  // Clean user input (remove spaces + make lowercase)
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
    // Fetch single Pokémon from API
    const data = await fetchPokemonByNameOrId(searchValue);

    // Convert API data into reusable object
    const pokemonObject = createPokemonObject(data, typeColors);

    // Render Pokémon inside the modal dialog
    dialogContent.innerHTML = createPokemonCard(pokemonObject, false);

    // Open modal
    searchDialog.showModal();
  } catch (error) {
    // Handle case where Pokémon is not found or API fails
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

// ==========================
// EVENT LISTENERS
// ==========================

// Trigger search when button is clicked
searchBtn.addEventListener("click", searchPokemon);

// Allow search when pressing "Enter" in input field
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchPokemon();
  }
});

// Close the search modal when close button is clicked
closeDialogBtn.addEventListener("click", () => {
  searchDialog.close();
});

// ==========================
// START APPLICATION
// ==========================

// Run initial load when page is opened
init();
