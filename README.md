# 🔧 Pokédex Refactor Project

## 📌 Overview

This project is a refactored version of a Pokédex application built with JavaScript and Vite.

The goal of this refactor was to improve code structure, readability, and maintainability while preserving the original functionality.

---

## 🎯 Refactor Goals

| ID    | Improvement                            | Description                                                         | Status |
| ----- | -------------------------------------- | ------------------------------------------------------------------- | ------ |
| FR001 | Use Vite as Bundler                    | Install and configure Vite for development and production builds    | ✅      |
| FR002 | Install Tailwind via npm               | Integrated TailwindCSS into the project build pipeline              | ✅      |
| FR003 | ES-Module Codebase                     | Converted JavaScript to ES modules (import/export)                  | ✅      |
| FR004 | Multiple HTML Entries                  | Configured Vite for multi-page setup (index.html & pokedex.html)    | ✅      |
| FR005 | Clear File Structure                   | Each HTML file loads its own entry script (home.js, pokedexPage.js) | ✅      |
| FR006 | Commented & Documented Code            | Added comments explaining logic and module responsibilities         | ✅      |
| FR007 | Bug Fixes                              | Fixed issues from the original implementation                       | ✅      |
| FR008 | Edge-Case Handling                     | Handled empty results and edge cases gracefully                     | ✅      |
| FR009 | Robust Error Handling                  | Added user-visible feedback for API/network errors                  | ✅      |
| FR010 | Refactor for Readability & Scalability | Broke large functions into smaller, reusable modules                | ✅      |
| FR011 | Static-Site Deployment                 | Built project using Vite and prepared for deployment                | ✅      |

---

## 🧭 Main User Journey

1. User opens **index.html**
2. `home.js` runs
3. `api.js` fetches Pokémon data
4. `pokemonCard.js` builds and displays Pokémon cards
5. User clicks **Catch**
6. `storage.js` saves Pokémon to `localStorage`
7. User opens **pokedex.html**
8. `pokedexPage.js` loads saved Pokémon
9. User can:

   * add personal notes
   * release Pokémon

---

## 🌐 Live Demo

https://pokedex-diary-refactor.onrender.com
