import { ApolloClient, InMemoryCache } from "@apollo/client";

const githubAccessToken = "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";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${githubAccessToken}`,
  },
});
