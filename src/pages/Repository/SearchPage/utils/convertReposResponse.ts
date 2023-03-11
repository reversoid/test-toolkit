import { GetRepositoriesResponse } from "../api/getRepositories";
import { RepositoryState } from "../model";

export const convertReposResponse = (
  response: GetRepositoriesResponse
): RepositoryState => {
  return response.data.viewer.repositories.edges.map(
    ({ cursor, repository }) => ({
      cursor: cursor,
      repository: {
        description: repository.description,
        languages: repository.languages.nodes.map((r) => ({ name: r.name })),
        name: repository.name,
        owner: {
          avatarUrl: repository.owner.avatarUrl,
          name: repository.owner.login,
          url: repository.owner.url,
        },
        stargazerCount: repository.stargazerCount,
        updatedAt: new Date(repository.updatedAt),
      },
    })
  );
};
