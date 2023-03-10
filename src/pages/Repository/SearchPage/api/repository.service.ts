import { DocumentNode } from "@apollo/client";
import { fetchGQL } from "../../../../app/api/fetchGQL";
import {
  GetRepositoriesResponse,
  PAGE_LIMIT,
  getRepositoriesQuery,
} from "./getRepositoriesQuery";
import {
  GetLastRepositoryCursorResponse,
  getLastRepositoryCursor,
} from "./getLastRepositoryCursorQuery";

const MAXIMUM_PAGE_REACHABLE_WITH_ONE_QUERY = 11; // as max of github 'first' is 100

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

      if (this.pageGoesBeyondRepoCount(page, repositoryCount)) {
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

      if (this.pageGoesBeyondRepoCount(page, repositoryCount)) {
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

  private pageGoesBeyondRepoCount(page: number, repositoryCount: number) {
    return Math.floor((PAGE_LIMIT * page) / repositoryCount) > 1;
  }

  private async getLastCursor({
    page,
    username,
    repoName,
    afterCursor,
  }: {
    page: number;
    username?: string;
    repoName?: string;
    afterCursor?: string;
  }): Promise<GetLastRepositoryCursorResponse> {
    if (page <= MAXIMUM_PAGE_REACHABLE_WITH_ONE_QUERY) {
      return fetchGQL<GetLastRepositoryCursorResponse>(
        getLastRepositoryCursor({
          page,
          username: username,
          repoName: repoName,
          afterCursor,
        })
      ).then((r) => r.data);
    } else {
      return this.getLastCursor({
        page: page - MAXIMUM_PAGE_REACHABLE_WITH_ONE_QUERY,
        repoName,
        username,
        afterCursor,
      });
    }
  }
}

export const repositoryService = new RepositoryService();
