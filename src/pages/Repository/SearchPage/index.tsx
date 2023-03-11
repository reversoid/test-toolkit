import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";
import { useEffect } from "react";
import { $repositories, fetchRepositories } from "./model";
import { useStore } from "effector-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    const repoName = searchParams.get("repoName") ?? undefined;
    const pageToSearch = !page || page === 1 ? 1 : page;

    fetchRepositories({ page: pageToSearch, repoName });
  }, [searchParams.get("page"), searchParams.get("repoName")]);

  const repositories = useStore($repositories);

  return (
    <>
      <Input
        type="text"
        css={{ width: "100%" }}
        placeholder="Название репозитория"
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setSearchParams({ repoName: e.target.value });
          } else {
            searchParams.delete("repoName");
            setSearchParams(searchParams);
          }
        }}
      />

      <RepositoryContainer>
        {repositories
          ? repositories.repositories.map((r) => {
              return (
                <RepositoryItem
                  lastCommitDate={new Date(r.updatedAt)}
                  link="/repository/1"
                  name={r.name}
                  stars={r.stargazerCount}
                  key={r.owner.name + r.name}
                />
              );
            })
          : ""}
      </RepositoryContainer>

      <PaginatorContainer>
        <Paginator
          from={1}
          to={2}
          onSelect={(currentPage) =>
            setSearchParams({ page: String(currentPage) })
          }
        />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
