import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./reducers/user.reducer";
import themeReducer from "./reducers/theme.reducer";
import sidebarReducer from "./reducers/sidebar.reducer";
import workReducer from "./reducers/work.reducer";
import { auth } from "./api/auth.api";
import { workApi } from "./api/work.api";
import { userApi } from "./api/user.api";
import { responseMiddleware } from "./middleware/responseMiddleware";
export const store = configureStore({
  reducer: {
    user: userReducer,
    theme:themeReducer,
    work:workReducer,
    sidebar:sidebarReducer,
    [auth.reducerPath]: auth.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [workApi.reducerPath]: workApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(auth.middleware).concat(workApi.middleware).concat(userApi.middleware).concat(responseMiddleware)
});
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
