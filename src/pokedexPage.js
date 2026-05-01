import "./index.css";
import {
  getCaughtPokemon,
  releasePokemon,
  savePokemonNote,
} from "./modules/storage.js";

// MAIN CONTAINER for all saved Pokémon cards
const favoritesContainer = document.getElementById("favoritesContainer");

/**
 * Creates a full Pokémon card INCLUDING notes + actions
 * Used only on the Pokédex page (saved Pokémon view)
 */
function createSavedPokemonCard(pokemon) {
  // Only render second type if it exists
  const type2HTML = pokemon.types[1]
    ? `<span class="${pokemon.type2Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[1]}</span>`
    : "";

  // Return full card HTML including:
  // - Pokémon info
  // - Personal note textarea
  // - Save + Release buttons
  return `
    <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
      
      <!-- Pokémon Image -->
      <div class="bg-slate-100 h-60 flex items-center justify-center">
        <img src="${pokemon.sprite}" alt="${pokemon.name}" class="w-36 h-36 object-contain" />
      </div>

      <div class="p-6">

        <!-- Name + ID -->
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-extrabold">${pokemon.name}</h2>
          <span class="text-slate-400 text-2xl font-semibold">${pokemon.idString}</span>
        </div>

        <!-- Types -->
        <div class="flex gap-3 mb-5">
          <span class="${pokemon.type1Color} text-white text-sm font-bold px-4 py-2 rounded-full">${pokemon.types[0]}</span>
          ${type2HTML}
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-y-3 gap-x-5 text-xl mb-6">
          <p class="flex justify-between"><span class="text-slate-500">Hp:</span> <span class="font-bold">${pokemon.stats.hp}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Speed:</span> <span class="font-bold">${pokemon.stats.speed}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Attack:</span> <span class="font-bold">${pokemon.stats.attack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Defense:</span> <span class="font-bold">${pokemon.stats.defense}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Atk:</span> <span class="font-bold">${pokemon.stats.specialAttack}</span></p>
          <p class="flex justify-between"><span class="text-slate-500">Sp. Def:</span> <span class="font-bold">${pokemon.stats.specialDefense}</span></p>
        </div>

        <!-- Personal Notes Section -->
        <div class="mb-5">
          <label for="note-${pokemon.id}" class="block text-lg font-semibold mb-2">
            Personal Note:
          </label>

          <!-- Pre-fill textarea if note already exists -->
          <textarea
            id="note-${pokemon.id}"
            rows="4"
            placeholder="Write a note about this Pokémon..."
            class="w-full border border-slate-300 rounded-2xl p-4 text-lg outline-none focus:ring-2 focus:ring-red-400 resize-none"
          >${pokemon.note || ""}</textarea>
        </div>

        <!-- Save Note Button -->
        <button
          id="saveNoteBtn-${pokemon.id}"
          class="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
        >
          Save Note
        </button>

        <!-- Release Pokémon Button -->
        <button
          id="releaseBtn-${pokemon.id}"
          class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Release ${pokemon.name}
        </button>

      </div>
    </article>
  `;
}

/**
 * Loads all caught Pokémon from localStorage
 * and renders them to the page
 */
function loadPokedex() {
  const favoritePokemon = getCaughtPokemon();

  // Handle empty state (no Pokémon caught yet)
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

  // Build all Pokémon cards
  for (const pokemon of favoritePokemon) {
    html += createSavedPokemonCard(pokemon);
  }

  favoritesContainer.innerHTML = html;

  // Attach event listeners AFTER rendering
  for (const pokemon of favoritePokemon) {
    const saveBtn = document.getElementById(`saveNoteBtn-${pokemon.id}`);
    const releaseBtn = document.getElementById(`releaseBtn-${pokemon.id}`);

    // Save note to localStorage
    saveBtn.addEventListener("click", () => {
      const noteInput = document.getElementById(`note-${pokemon.id}`);
      savePokemonNote(pokemon.id, noteInput.value);
      alert("Note saved for " + pokemon.name + "!");
    });

    // Remove Pokémon from storage and re-render
    releaseBtn.addEventListener("click", () => {
      releasePokemon(pokemon.id);
      alert("You released " + pokemon.name + "!");
      loadPokedex(); // refresh UI
    });
  }
}

// Initialize page
loadPokedex();