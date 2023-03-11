import { DocumentNode } from "@apollo/client";
import { fetchGQL } from "../../../../app/api/fetchGQL";
import {
  GetRepositoriesResponse,
  PAGE_LIMIT,
  getRepositoriesQuery,
} from "./getRepositories";
import {
  GetLastRepositoryCursorResponse,
  getLastRepositoryCursor,
} from "./getLastRepositoryCursor";

export interface Options {
  page?: number;
  afterCursor?: string;
  repoName: string;
}

class RepositoryService {
  public async getRepositoriesByName({ repoName, afterCursor, page }: Options) {
    let query: DocumentNode;

    if (afterCursor) {
      query = getRepositoriesQuery({ afterCursor, repoName });
    } else if (page === 1) {
      query = getRepositoriesQuery({ repoName });
    } else if (page) {
      const {
        search: { pageInfo, repositoryCount },
      } = await this.getLastCursor({ page, repoName });

      if (repositoryCount < page * PAGE_LIMIT) {
        const EMPTY_RESPONSE = {
          search: { repositoryCount, pageInfo, edges: [] },
        };
        return EMPTY_RESPONSE;
      }
      query = getRepositoriesQuery({
        afterCursor: pageInfo.endCursor,
        repoName,
      });
    } else {
      throw new Error("Neither lastCursor nor page were provided");
    }

    return (await fetchGQL<GetRepositoriesResponse>(query)).data;
  }

  public async getMyRepositories({
    afterCursor,
    page,
  }: Omit<Options, "repoName">): Promise<GetRepositoriesResponse> {
    let query: DocumentNode;
    const username = "reversoid";

    if (afterCursor) {
      query = getRepositoriesQuery({ afterCursor, username });
    } else if (page === 1) {
      query = getRepositoriesQuery({ username });
    } else if (page) {
      const {
        search: { pageInfo, repositoryCount },
      } = await this.getLastCursor({ page, username });

      if (repositoryCount < page * PAGE_LIMIT) {
        const EMPTY_RESPONSE = {
          search: { repositoryCount, pageInfo, edges: [] },
        };
        return EMPTY_RESPONSE;
      }
      query = getRepositoriesQuery({
        afterCursor: pageInfo.endCursor,
        username,
      });
    } else {
      throw new Error("Neither lastCursor nor page were provided");
    }

    return (await fetchGQL<GetRepositoriesResponse>(query)).data;
  }

  private async getLastCursor({
    page,
    username,
    repoName,
  }: {
    page: number;
    username?: string;
    repoName?: string;
  }) {
    return fetchGQL<GetLastRepositoryCursorResponse>(
      getLastRepositoryCursor({ page, username, repoName })
    ).then((r) => r.data);
  }
}

export const repositoryService = new RepositoryService();
