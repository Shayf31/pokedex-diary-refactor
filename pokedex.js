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
    //button for saving notes is at end of section - not sure how to add notes inside template string literals??
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


<div class="mb-5">
  <label for="note-${pokemon.id}" class="block text-lg font-semibold mb-2">
    Personal Note:
  </label>

  <!-- textarea for user note -->
  <textarea
    id="note-${pokemon.id}"
    rows="4"
    placeholder="Write a note about this Pokemon..."
    class="w-full border border-slate-300 rounded-2xl p-4 text-lg outline-none focus:ring-2 focus:ring-red-400 resize-none"
  >${pokemon.note || ""}</textarea>
</div>


<button
  id="saveNoteBtn-${pokemon.id}"
  class="w-full bg-blue-500 text-white py-2 rounded-lg mb-2"
>
  Save Note
</button>

          <button id="releaseBtn-${pokemon.id}" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">Release ${pokemon.name}</button>
        </div>
      </article>`;
  });
  favoritesContainer.innerHTML = html;


//Loop through every saved Pokémon
favoritePokemon.forEach((pokemon) => {
  // get the save button for this pokemon
  const saveBtn = document.getElementById(`saveNoteBtn-${pokemon.id}`);

  // When user clicks “Save Note” → run this code
  saveBtn.addEventListener("click", () => {
    // get textarea value
    const noteInput = document.getElementById(`note-${pokemon.id}`);
    const noteValue = noteInput.value;

    // get current list from localStorage
    const caughtList = JSON.parse(
      localStorage.getItem("caughtPokemon") || "[]"
    );

    // find matching pokemon and update note
    caughtList.forEach((caughtPokemon) => {
      if (caughtPokemon.id === pokemon.id) {
        caughtPokemon.note = noteValue;
      }
    });

    // save updated list back to localStorage
    localStorage.setItem("caughtPokemon", JSON.stringify(caughtList));

    //alert to notify - maybe remove later if it looks messy
    alert("Note saved for " + pokemon.name + "!");
  });
});



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
