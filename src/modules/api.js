import { fetchPokemonPath } from "./constants.js";

export async function fetchPokemonList() {
  const response = await fetch(fetchPokemonPath);
  const data = await response.json();
  return data.results;
}

export async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  return response.json();
}

export async function fetchPokemonByNameOrId(searchValue) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchValue}`
  );

  if (!response.ok) {
    throw new Error("Pokemon not found");
  }

  return response.json();
}