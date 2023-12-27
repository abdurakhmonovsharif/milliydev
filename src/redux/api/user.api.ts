import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "./baseApi";
  interface UserRespone {
    success?: boolean;
    data: User
    message?: string;
  };
const token = localStorage.getItem("user_token")
const baseQueryHeaders = token ? { Authorization: `${token}` } : undefined;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API,headers: baseQueryHeaders}),
  endpoints: (builder) => ({
    getMe: builder.query<UserRespone,void>({
      query: () => `/users/me`,
    }),
    updateUsername: builder.mutation<void, {username:string}>({
        query: ({username}) => ({
          url: `/users/update_username`,
          method: "PATCH",
          body: username,
        }),
      }),
      updatePassword: builder.mutation<void, {current_password:string,new_password:string}>({
        query: ({current_password,new_password}) => ({
          url: `/users/update_password`,
          method: "PUT",
          body: {current_password,new_password},
        }),
      }),
      
  }),

});

export const {useGetMeQuery ,useUpdateUsernameMutation,useUpdatePasswordMutation} = userApi;
