import { gql } from "@apollo/client";

export const PAGE_LIMIT = 10;

export interface GetRepositoriesResponse {
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
}

export interface GetRepositoriesParams {
  afterCursor?: string;
  username?: string;
  repoName?: string;
}

export const generateGQLParamsString = ({ afterCursor }: GetRepositoriesParams) => {
  if (afterCursor) {
    return ` after: "${afterCursor}"`;
  }
  return "";
};

export const generateSearchQuery = ({ repoName, username }: GetRepositoriesParams) => {
  let result = "";
  if (repoName) {
    result += ` ${repoName} in:name`;
  }
  if (username) {
    result += ` user:${username}`;
  }
  return result;
};

export const getRepositories = ({
  afterCursor,
  username,
  repoName,
}: GetRepositoriesParams) => gql`
  query {
    search(
      query: "sort:updated-desc ${generateSearchQuery({ username, repoName })}"
      type: REPOSITORY
      first: 10
      ${generateGQLParamsString({ afterCursor })}
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
