// Import the base API endpoint for fetching the Pokémon list
import { fetchPokemonPath } from "./constants.js";

// Fetches a list of Pokémon (basic data only: name + URL)
// This is used on the homepage to get the initial list
export async function fetchPokemonList() {
  const response = await fetch(fetchPokemonPath);

  // Convert the API response into usable JSON
  const data = await response.json();

  // Return only the results array (list of Pokémon)
  return data.results;
}

// Fetches detailed data for a single Pokémon using its API URL
// This includes stats, types, sprites, etc.
export async function fetchPokemonDetails(url) {
  const response = await fetch(url);

  // Return the full Pokémon data object
  return response.json();
}

// Fetches a single Pokémon by name or ID (used for search functionality)
// Example: "pikachu" or "25"
export async function fetchPokemonByNameOrId(searchValue) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchValue}`
  );

  // If the Pokémon doesn't exist, throw an error for the UI to handle
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  // Return the matching Pokémon data
  return response.json();
}