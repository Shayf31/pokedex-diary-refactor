// Import Tailwind/CSS styles for this page
import "./index.css";

// Import localStorage helper functions for managing caught Pokémon
import {
  getCaughtPokemon,
  releasePokemon,
  savePokemonNote,
} from "./modules/storage.js";

// Import reusable card generator for displaying Pokémon
import { createPokemonCard } from "./modules/pokemonCard.js";

// Container where saved Pokémon will be displayed
const favoritesContainer = document.getElementById("favoritesContainer");

// Loads and renders the user's saved (caught) Pokémon
function loadPokedex() {
  // Retrieve Pokémon from localStorage
  const favoritePokemon = getCaughtPokemon();

  // If no Pokémon are saved, display a message to the user
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

  // Loop through each saved Pokémon and build the UI
  for (const pokemon of favoritePokemon) {
    html += `
      <!-- Reuse shared Pokémon card layout -->
      ${createPokemonCard(pokemon, false)}

      <!-- Additional section for notes and actions -->
      <div class="bg-white rounded-3xl shadow-lg p-6 mt-4 mb-8">
        <label for="note-${pokemon.id}" class="block text-lg font-semibold mb-2">
          Personal Note:
        </label>

        <!-- Textarea allows user to store a personal note for each Pokémon -->
        <textarea
          id="note-${pokemon.id}"
          rows="4"
          placeholder="Write a note about this Pokémon..."
          class="w-full border border-slate-300 rounded-2xl p-4 text-lg outline-none focus:ring-2 focus:ring-red-400 resize-none"
        >${pokemon.note || ""}</textarea>

        <!-- Button to save the note to localStorage -->
        <button
          id="saveNoteBtn-${pokemon.id}"
          class="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 mb-2"
        >
          Save Note
        </button>

        <!-- Button to remove the Pokémon from the Pokédex -->
        <button
          id="releaseBtn-${pokemon.id}"
          class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Release ${pokemon.name}
        </button>
      </div>
    `;
  }

  // Render all Pokémon and their associated controls
  favoritesContainer.innerHTML = html;

  // Attach event listeners for note saving and releasing Pokémon
  for (const pokemon of favoritePokemon) {
    const saveBtn = document.getElementById(`saveNoteBtn-${pokemon.id}`);
    const releaseBtn = document.getElementById(`releaseBtn-${pokemon.id}`);

    // Save personal note to localStorage
    saveBtn.addEventListener("click", () => {
      const noteInput = document.getElementById(`note-${pokemon.id}`);
      savePokemonNote(pokemon.id, noteInput.value);
      alert("Note saved for " + pokemon.name + "!");
    });

    // Remove Pokémon from saved list and re-render UI
    releaseBtn.addEventListener("click", () => {
      releasePokemon(pokemon.id);
      alert("You released " + pokemon.name + "!");
      loadPokedex(); // Refresh the page content after removal
    });
  }
}

// Initialise the Pokédex page when it loads
loadPokedex();
