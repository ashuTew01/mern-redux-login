import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
//thunk middleware whatever that is, is already included in this so you don't have to write that. RTK query is a library for interacting with backend api and thunk middleware is built in..

const baseQuery = fetchBaseQuery({baseUrl: '' /*can be put empty and not localhost... coz we specified a proxy.*/ });

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],    //for things like blog posts where you don't wanna fetch data everytime but instead just cache it and use it.
    endpoints: (builder) => ({})
});
