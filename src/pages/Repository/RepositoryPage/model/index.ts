import { createEffect, createEvent, createStore, sample } from "effector";
import { Repository } from "../../SearchPage/model/types";
import {
  GetRepositoryResponse,
  getRepositoryQuery,
} from "../api/getRepository";
import { fetchGQL } from "../../../../app/api/fetchGQL";
import { convertReposResponse } from "../utils/convertRepoResponse";

export const fetchRepository = createEvent<{ id: string }>();

export const fetchRepositoryFx = createEffect<
  { id: string },
  GetRepositoryResponse
>();
fetchRepositoryFx.use(({ id }) =>
  fetchGQL<GetRepositoryResponse>(getRepositoryQuery(id)).then((r) => r.data)
);

export const $repository = createStore<Repository | null>(null);
$repository.on(fetchRepositoryFx.doneData, (state, payload) =>
  convertReposResponse(payload)
);

sample({
  clock: fetchRepository,
  target: fetchRepositoryFx,
});
