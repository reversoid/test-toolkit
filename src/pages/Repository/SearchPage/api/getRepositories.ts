import { gql } from "@apollo/client";

export interface GetRepositoriesResponse {
  data: {
    viewer: {
      repositories: {
        edges: {
          repository: {
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
          };
          cursor: string;
        }[];
      };
    };
  };
}

export const getRepositories = (afterCursor?: string) => gql`
  query {
    viewer {
      repositories(first: 10 ${afterCursor ? ", after: " + afterCursor : ""}) {
        edges {
          repository: node {
            name
            stargazerCount
            description
            updatedAt
            owner {
              url
              avatarUrl
              login
            }
            languages(first: 100) {
              nodes {
                name
              }
            }
          }
          cursor
        }
      }
    }
  }
`;
