// HANDLES API REQUESTS:
// ==========================
// fetch Pokemon list
// fetch Pokemon details
// fetch Pokemon by name/ID

// Import the base API endpoint for fetching the Pokemon list
import { fetchPokemonPath } from "./constants.js";

// break large fetch function down into 1. list then detail
// Fetches a list of Pokemon (basic data only: name + URL)
// This is used on the homepage to get the initial list
export async function fetchPokemonList() {
  const response = await fetch(fetchPokemonPath);

  // Convert the API response into usable JSON
  const data = await response.json();

  // Return only the results array (list of Pokemon)
  return data.results;
}

// Fetches detailed data for a single Pokemon using its API URL
// This includes stats, types, sprites, etc.
export async function fetchPokemonDetails(url) {
  const response = await fetch(url);

  // Return the full Pokemon data object
  return response.json();
}

// Fetches a single Pokemon by name or ID (used for search functionality)
// Example: "pikachu" or "25"
export async function fetchPokemonByNameOrId(searchValue) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchValue}`
  );

  // If the Pokemon doesn't exist, throw an error for the UI to handle
  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  // Return the matching Pokemon data
  return response.json();
}