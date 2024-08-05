import axios from "axios";

export const PokeAPI = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`
});

export const AppAPI = axios.create({
  baseURL: `http://localhost:4000/api`
});