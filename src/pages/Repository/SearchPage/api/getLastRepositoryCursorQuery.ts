import { gql } from "@apollo/client";
import {
  GetRepositoriesParams,
  PAGE_LIMIT,
  generateGQLParamsString,
  generateSearchQuery,
} from "./getRepositoriesQuery";

export interface GetLastRepositoryCursorResponse {
    search: {
      repositoryCount: number;
  
      pageInfo: {
        endCursor: string;
        hasNextPage: boolean;
      };
    };
  }

export const getLastRepositoryCursor = ({
  afterCursor,
  username,
  repoName,
  page,
}: GetRepositoriesParams & { page: number }) => gql`
    query {
      search(
        query: "sort:updated-desc ${generateSearchQuery({
          username,
          repoName,
        })}"
        type: REPOSITORY
        first: ${PAGE_LIMIT * (page - 1)}
        ${generateGQLParamsString({ afterCursor })}
      ) {
        repositoryCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  `;
