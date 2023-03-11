import { GetRepositoriesResponse } from "../api/getRepositories";
import { RepositoryState } from "../model";

export const convertReposResponse = (
  response: GetRepositoriesResponse
): RepositoryState => {
  return {
    repositories: response.search.edges.map(({ node }) => ({
      description: node.description,
      languages: node.languages.nodes.map((r) => ({ name: r.name })),
      name: node.name,
      owner: {
        avatarUrl: node.owner.avatarUrl,
        name: node.owner.login,
        url: node.owner.url,
      },
      stargazerCount: node.stargazerCount,
      updatedAt: new Date(node.updatedAt),
      id: node.id,
      url: node.url
    })),

    lastCursor: response.search.pageInfo.endCursor,
  };
};
