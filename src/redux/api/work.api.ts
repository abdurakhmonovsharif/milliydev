import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_API } from "./baseApi";
interface ArrayWorkRespone {
    success?: boolean;
    data: Work[]
    message?: string;
  };
  interface OneWorkRespone {
    success?: boolean;
    data: Work
    message?: string;
  };
  const token = localStorage.getItem("user_token")
const baseQueryHeaders = token ? { Authorization: `${token}` } : undefined;
export const workApi = createApi({
  reducerPath: "workApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API,headers: baseQueryHeaders}),
  endpoints: (builder) => ({
    getWorks: builder.query<ArrayWorkRespone,void>({
      query: () => "/work",
    }),
    getWorkById: builder.query<OneWorkRespone,{id:string}>({
      query: ({id}) => `/work/${id}`,
    }),
    getWorksByCaption:builder.query<ArrayWorkRespone,{caption:string}>({
      query:({caption})=>`/work/search/${caption}`
    }),
    postWork: builder.mutation<Work, Partial<FormData>>({
      query: (work) => ({
        url: "/work",
        method: "POST",
        body: work,
      }),
    }),
    updateWork: builder.mutation<void, {work:Partial<FormData>,work_id:string}>({
        query: ({work,work_id}) => ({
          url: `/work/${work_id}`,
          method: "PUT",
          body: work,
        }),
      }),
      deleteWork: builder.mutation<void, {id:string}>({
        query: ({id}) => ({
          url: `/work/${id}`,
          method: "DELETE",
        }),
      }),
  }),
});

export const { useGetWorksQuery,useGetWorksByCaptionQuery,useGetWorkByIdQuery,usePostWorkMutation,useUpdateWorkMutation,useDeleteWorkMutation} = workApi;
