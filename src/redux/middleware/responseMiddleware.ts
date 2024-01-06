import { Middleware } from "redux";
export const responseMiddleware: Middleware =
  () => (next) => async (action) => {
    const response = next(action);
    if (action?.meta?.baseQueryMeta?.response?.status === 403) {
      window.location.assign("/login");
      localStorage.clear()
    }
    return response;
  };
