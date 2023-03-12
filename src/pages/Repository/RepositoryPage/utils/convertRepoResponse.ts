import { Repository } from "../../SearchPage/model/types";
import { GetRepositoryResponse } from "../api/getRepository";

export const convertReposResponse = ({node}: GetRepositoryResponse): Repository => {
  const {description, id, languages, name, owner, stargazerCount, updatedAt, url} = node;
  return {
    description,
    id,
    languages: languages.nodes.map((l) => ({ name: l.name })),
    name,
    owner: {
      avatarUrl: owner.avatarUrl,
      name: owner.login,
      url: owner.url,
    },
    stargazerCount,
    updatedAt: new Date(updatedAt),
    url
  };
};
