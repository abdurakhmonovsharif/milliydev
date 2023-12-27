import { Middleware } from "redux";
export const responseMiddleware: Middleware =
  () => (next) => async (action) => {
    const response = next(action);
    if (action?.meta?.baseQueryMeta?.response?.status === 403||action?.payload?.status==="FETCH_ERROR") {
      window.location.assign("/login");
    }
    return response;
  };
