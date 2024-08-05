import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Pokemon {
  id: number;
  given_name?: string;
  rename_sequence?: number;
  name: string;
  weight: number;
  height: number;
  moves: [];
  types: [];
  sprites: [];
}

interface FavoritesState {
  favorites: Pokemon[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<Pokemon>) => {
      state.favorites = state.favorites.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
    },
    editFavorite: (state, action: PayloadAction<Pokemon>) => {
      const index = state.favorites.findIndex(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (index !== -1) {
        state.favorites[index] = action.payload;
      }
    },
  },
});

export const { addFavorite, removeFavorite, editFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;