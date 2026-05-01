import "./index.css";
import {
  getCaughtPokemon,
  releasePokemon,
  savePokemonNote,
} from "./modules/storage.js";
import { createPokemonCard } from "./modules/pokemonCard.js";

const favoritesContainer = document.getElementById("favoritesContainer");

function loadPokedex() {
  const favoritePokemon = getCaughtPokemon();

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

  for (const pokemon of favoritePokemon) {
    html += `
      ${createPokemonCard(pokemon, false)}

      <div class="bg-white rounded-3xl shadow-lg p-6 mt-4 mb-8">
        <label for="note-${pokemon.id}" class="block text-lg font-semibold mb-2">
          Personal Note:
        </label>

        <textarea
          id="note-${pokemon.id}"
          rows="4"
          placeholder="Write a note about this Pokémon..."
          class="w-full border border-slate-300 rounded-2xl p-4 text-lg outline-none focus:ring-2 focus:ring-red-400 resize-none"
        >${pokemon.note || ""}</textarea>

        <button
          id="saveNoteBtn-${pokemon.id}"
          class="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 mb-2"
        >
          Save Note
        </button>

        <button
          id="releaseBtn-${pokemon.id}"
          class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Release ${pokemon.name}
        </button>
      </div>
    `;
  }

  favoritesContainer.innerHTML = html;

  for (const pokemon of favoritePokemon) {
    const saveBtn = document.getElementById(`saveNoteBtn-${pokemon.id}`);
    const releaseBtn = document.getElementById(`releaseBtn-${pokemon.id}`);

    saveBtn.addEventListener("click", () => {
      const noteInput = document.getElementById(`note-${pokemon.id}`);
      savePokemonNote(pokemon.id, noteInput.value);
      alert("Note saved for " + pokemon.name + "!");
    });

    releaseBtn.addEventListener("click", () => {
      releasePokemon(pokemon.id);
      alert("You released " + pokemon.name + "!");
      loadPokedex();
    });
  }
}

loadPokedex();