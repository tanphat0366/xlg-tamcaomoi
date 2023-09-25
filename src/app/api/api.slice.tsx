import {
    FetchArgs,
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  
  const baseQuery = fetchBaseQuery({
    // baseUrl: "http://localhost:8000/",
    baseUrl: "https://ajax.xlg.ai/",
    credentials: "same-origin",
    prepareHeaders: (headers, {}) => {
      headers.set("Content-Type", "application/json");
      if (!localStorage.token) return headers;
  
      let token;
  
      try {
        token = JSON.parse(localStorage.token);
      } catch {
        return headers;
      }
  
      if (token.access.length)
        headers.set("Authorization", `Bearer ${token.access}`);
  
      return headers;
    },
  });
  
  const logOut = () => {
    localStorage.removeItem("token");
    let path = window.location.pathname;
    if (path != "/login") window.location.href = "/login?redirect=" + path;
  };
  
  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
      logOut();
      return result;
    }
    return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});