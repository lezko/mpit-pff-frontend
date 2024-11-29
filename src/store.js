import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/api/baseApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // [feedsApi.reducerPath]: feedsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  // .concat(feedsApi.middleware),
});

setupListeners(store.dispatch);
