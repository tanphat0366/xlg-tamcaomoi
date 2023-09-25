import { apiSlice } from "../../api/api.slice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/v1/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => "/v1/profile",
    }),
    getWallet: builder.query({
      query: () => "/v1/wallet",
    }),
    reloadApiKey: builder.mutation({
      query: () => ({
        url: "/v1/reset-api-key",
        method: "POST",
      }),
    }),
    loginMs: builder.mutation({
      query: (data) => ({
        url: "/v1/login-ms",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyProfileQuery,
  useLazyGetWalletQuery,
  useReloadApiKeyMutation,
  useLoginMsMutation
} = authApi;
