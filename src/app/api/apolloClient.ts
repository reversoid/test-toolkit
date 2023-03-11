import { ApolloClient, InMemoryCache } from "@apollo/client";

const githubAccessToken = "g hp_ay PSr0 rpC Pbr0GA pdJQupon DE gp Sqo 4eml 1g";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `bearer ${githubAccessToken.replace(/ /g, "")}`,
  },
});
