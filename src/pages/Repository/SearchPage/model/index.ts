import { createEvent, createStore } from "effector";

export interface Owner {
  avatarUrl: string | null;
  url: string;
  name: string;
}

export interface Language {
  name: string;
}

export interface Repository {
  name: string;
  stargazerCount: number;
  description: string | null;
  updatedAt: Date;
  owner: Owner;
  languages: Language[];
}

export type RepositoryState = {
  repository: Repository;
  cursor: string;
}[];

export const setRepositories = createEvent<RepositoryState>();

export const $repositories = createStore<RepositoryState | null>(null);
$repositories.on(setRepositories, (state, newState) => newState);
