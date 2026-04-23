const favorites = JSON.parse(localStorage.getItem("caughtPokemon") || "[]");


const favoritesContainer = document.getElementById("favoritesContainer");

function loadPokedex() {
  // get saved pokemon from localStorage
  const favoritePokemon = JSON.parse(
    localStorage.getItem("caughtPokemon") || "[]"
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

  // loop through saved pokemon and build card html
  tbc