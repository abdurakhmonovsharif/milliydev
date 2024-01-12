import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./reducers/user.reducer";
import themeReducer from "./reducers/theme.reducer";
import sidebarReducer from "./reducers/sidebar.reducer";
import workReducer from "./reducers/work.reducer";
import { workApi } from "./api/work.api";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    work: workReducer,
    sidebar: sidebarReducer,
    [workApi.reducerPath]: workApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(workApi.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
