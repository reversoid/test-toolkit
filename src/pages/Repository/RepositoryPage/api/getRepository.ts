import { gql } from "@apollo/client";

export interface GetRepositoryResponse {
  node: {
    description: string | null;
    languages: {
      nodes: {
        name: string;
      }[];
    };
    name: string;
    stargazerCount: number;
    updatedAt: string;
    owner: {
      avatarUrl: string | null;
      login: string;
      url: string;
    };
    id: string;
    url: string;
  };
}

export const getRepositoryQuery = (repoId: string) => gql`
  query repository {
    node(id: "${repoId}") {
      ... on Repository {
        name
        description
        stargazerCount
        updatedAt
        id
        url
        languages(first: 100) {
          nodes {
            name
          }
        }
        owner {
          avatarUrl
          login
          url
        }
      }
    }
  }
`;
