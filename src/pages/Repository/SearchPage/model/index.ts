import { createEffect, createEvent, createStore, sample } from "effector";
import { repositoryService } from "../api/repository.service";
import { convertReposResponse } from "../utils/convertReposResponse";
import { Repository } from "./types";


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
  RepositoryState
>();
fetchMyRepositoriesFx.use(async ({ lastCursor, page }) =>
  repositoryService
    .getMyRepositories({ afterCursor: lastCursor, page: page })
    .then((r) => convertReposResponse(r))
);

export const fetchRepositoriesByNameFx = createEffect<
  { page?: number; lastCursor?: string; repoName: string },
  RepositoryState
>();
fetchRepositoriesByNameFx.use(
  async ({ lastCursor: afterCursor, page, repoName }) =>
    repositoryService
      .getRepositoriesByName({ repoName, afterCursor, page })
      .then((r) => convertReposResponse(r))
);

export const $repositories = createStore<RepositoryState | null>(null);
$repositories.on(
  fetchRepositoriesByNameFx.doneData,
  (state, payload) => payload
);
$repositories.on(fetchMyRepositoriesFx.doneData, (state, payload) => payload);

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
