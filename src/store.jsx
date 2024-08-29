import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import categoryReducer from "./features/category/categorySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoryReducer,
  },
});
export default store;
