"use client"
import { ApolloClient, InMemoryCache,HttpLink, } from "@apollo/client";
export const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,
  }),
  cache: new InMemoryCache(),

});