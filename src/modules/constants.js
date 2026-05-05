// STORES SHARED VALUES USED AROUND THE APP
// =========================================
//API URL + TYPE 2 COLOURS

export const fetchPokemonPath = "https://pokeapi.co/api/v2/pokemon?limit=151";

export const typeColors = {
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

// 
// Main user journey:
// User opens index.html
// 1. home.js runs
// 2. api.js fetches Pokémon
// 3. pokemonCard.js formats/builds cards
// 4. user clicks Catch
// 4. storage.js saves Pokémon to localStorage
// 5. user opens pokedex.html
// 6. pokedexPage.js loads saved Pokémon
// 7. user can save notes or release Pokémon







// 