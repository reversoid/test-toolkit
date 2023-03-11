import { gql } from "@apollo/client";

export const PAGE_LIMIT = 10

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

export interface GetRepositoriesParams {
  afterCursor?: string;
  offset?: number;
}

const generateGQLParamsString = ({
  afterCursor,
  offset,
}: GetRepositoriesParams) => {
  if (afterCursor) {
    return ` after: "${afterCursor}"`;
  } else if (offset !== undefined) {
    return ` offset: ${1}`;
  }
  return "";
};

export const getRepositories = (params: GetRepositoriesParams) => gql`
  query {
    viewer {
      repositories(first: ${PAGE_LIMIT} ${generateGQLParamsString(params)}) {
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
