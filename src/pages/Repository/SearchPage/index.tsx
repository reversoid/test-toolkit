import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";
import { useEffect, useState } from "react";
import { $repositories, fetchRepositories } from "./model";
import { useStore } from "effector-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [info, setInfo] = useState({
    page: Number(searchParams.get("page")) || 1,
    repoName: searchParams.get("repoName") ?? undefined,
  });

  useEffect(() => {
    setInfo({
      page: Number(searchParams.get("page")) || 1,
      repoName: searchParams.get("repoName") ?? undefined,
    });
  }, [searchParams.get("page"), searchParams.get("repoName")]);

  useEffect(() => {
    if (!info.repoName) {
      searchParams.delete("repoName");
    } else {
      searchParams.set("repoName", info.repoName);
    }
    searchParams.set("page", String(info.page));

    setSearchParams(searchParams);
    fetchRepositories(info);
  }, [info]);

  const repositories = useStore($repositories);

  return (
    <>
      <Input
        type="text"
        css={{ width: "100%" }}
        placeholder="Название репозитория"
        value={info.repoName ?? ""}
        onChange={(e) => {
          if (e.target.value.length > 0) {
            setInfo({ ...info, repoName: e.target.value });
          } else {
            setInfo({ ...info, repoName: undefined });
          }
        }}
      />

      <RepositoryContainer>
        {repositories
          ? repositories.repositories.map((r) => {
              return (
                <RepositoryItem
                  lastCommitDate={new Date(r.updatedAt)}
                  link={`/repository/${r.id}`}
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
