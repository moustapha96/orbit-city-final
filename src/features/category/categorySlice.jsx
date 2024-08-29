// src/features/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Categorieservice from "../../services/CategorieService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await Categorieservice.getCategories();
    const filtered = response.filter(
      (c) =>
        c.name !== "Services" &&
        c.name !== "Expenses" &&
        c.name !== "Internal" &&
        c.name !== "Consumable" &&
        c.name !== "Saleable" &&
        c.name !== "Software"
    );
    return filtered;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    selectedCategory: null,
    categories: [],
    isLoadingCategorie: false,
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoadingCategorie = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategorie = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoadingCategorie = false;
        state.error = action.error.message;
      });
  },
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
