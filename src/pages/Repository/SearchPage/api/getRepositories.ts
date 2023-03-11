import { gql } from "@apollo/client";

export const PAGE_LIMIT = 10;

export interface GetRepositoriesResponse {
  data: {
    search: {
      repositoryCount: number;

      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };

      edges: {
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
        };
      }[];
    };
  };
}

export interface GetRepositoriesParams {
  afterCursor?: string;
}

const generateGQLParamsString = ({
  afterCursor,
}: GetRepositoriesParams) => {
  if (afterCursor) {
    return ` after: "${afterCursor}"`;
  }
  return "";
};

export const getRepositories = ({afterCursor}: GetRepositoriesParams) => gql`
  query {
    search(
      query: "sort:updated-desc user:reversoid"
      type: REPOSITORY
      first: 10
      ${generateGQLParamsString({afterCursor})}
    ) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            name
            description
            stargazerCount
            updatedAt
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
    }
  }
`;

export const introspect = gql`
  query {
    __type(name: "SearchResultItemConnection") {
      name
      kind
      description
      fields {
        name
      }
    }
  }
`;
