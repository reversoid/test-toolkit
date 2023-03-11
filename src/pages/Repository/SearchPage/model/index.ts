import { createEffect, createEvent, createStore, sample } from "effector";
import { fetchGQL } from "../../../../app/api/fetchGQL";
import {
  GetRepositoriesResponse,
  PAGE_LIMIT,
  getRepositories,
} from "../api/getRepositories";
import { Repository } from "./types";
import {
  GetLastRepositoryCursorResponse,
  getLastRepositoryCursor,
} from "../api/getLastRepositoryCursor";
import { convertReposResponse } from "../utils/convertReposResponse";

// TODO use services for handling async logic

export type RepositoryState = {
  repositories: Repository[];
  lastCursor: string;
};

export const fetchRepositories = createEvent<{
  page?: number;
  lastCursor?: string;
  repoName?: string;
}>();

export const fetchMyRepositoriesFx = createEffect<
  { page?: number; lastCursor?: string },
  GetRepositoriesResponse
>();
fetchMyRepositoriesFx.use(async ({ lastCursor, page }) => {
  const username = "reversoid";  

  if (lastCursor) {
    return fetchGQL<GetRepositoriesResponse>(
      getRepositories({ afterCursor: lastCursor, username })
    ).then((r) => r.data);
  }

  if (page === 1) {
    return fetchGQL<GetRepositoriesResponse>(
      getRepositories({ username })
    ).then((r) => r.data);
  }

  if (page) {
    const {
      data: {
        search: { pageInfo, repositoryCount },
      },
    } = await fetchGQL<GetLastRepositoryCursorResponse>(
      getLastRepositoryCursor({ page, username })
    );
    if (repositoryCount < page * PAGE_LIMIT) {
      const EMPTY_RESPONSE = {
        search: { repositoryCount, pageInfo, edges: [] },
      };
      return EMPTY_RESPONSE;
    }
    return fetchGQL<GetRepositoriesResponse>(
      getRepositories({
        afterCursor: pageInfo.endCursor,
        username,
      })
    ).then((r) => r.data);
  }

  throw new Error("Neither lastCursor nor page were provided");
});

export const fetchRepositoriesByNameFx = createEffect<
  { page?: number; lastCursor?: string; repoName: string },
  GetRepositoriesResponse
>();
fetchRepositoriesByNameFx.use(
  async ({ lastCursor: afterCursor, page, repoName }) => {
    if (afterCursor) {
      return fetchGQL<GetRepositoriesResponse>(
        getRepositories({ afterCursor, repoName })
      ).then((r) => r.data);
    }

    if (page === 1) {
      return fetchGQL<GetRepositoriesResponse>(
        getRepositories({ afterCursor, repoName })
      ).then((r) => r.data);
    }

    if (page) {
      const {
        data: {
          search: { pageInfo, repositoryCount },
        },
      } = await fetchGQL<GetLastRepositoryCursorResponse>(
        getLastRepositoryCursor({ page, repoName })
      );
      if (repositoryCount < page * PAGE_LIMIT) {
        const EMPTY_RESPONSE = {
          search: { repositoryCount, pageInfo, edges: [] },
        };
        return EMPTY_RESPONSE;
      }
      return fetchGQL<GetRepositoriesResponse>(
        getRepositories({
          afterCursor: pageInfo.endCursor,
          repoName,
        })
      ).then((r) => r.data);
    }

    throw new Error("Neither lastCursor nor page were provided");
  }
);

const convertedMyReposResponse = sample({
  clock: fetchMyRepositoriesFx.doneData,
  fn: (data) => convertReposResponse(data)
})

const convertedSearchReposResponse = sample({
  clock: fetchMyRepositoriesFx.doneData,
  fn: (data) => convertReposResponse(data)
})

export const $repositories = createStore<RepositoryState | null>(null);
$repositories.on(convertedMyReposResponse, (state, payload) => payload)
$repositories.on(convertedSearchReposResponse, (state, payload) => payload)

sample({
  clock: fetchRepositories,
  filter: ({ repoName }) => !Boolean(repoName),
  target: fetchMyRepositoriesFx,
});

sample({
  clock: fetchRepositories,
  filter: ({ repoName }) => Boolean(repoName),
  fn: (params) => ({ ...params, repoName: params.repoName ?? "" }),
  target: fetchRepositoriesByNameFx,
});

