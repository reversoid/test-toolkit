import { gql } from "@apollo/client";

export const getRepositories = (afterCursor?: string) => gql`
  query {
    viewer {
      repositories(first: 10 ${afterCursor ? ', after: '+afterCursor : ''}) {
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
