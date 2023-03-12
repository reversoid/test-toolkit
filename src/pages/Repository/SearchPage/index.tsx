import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";
import { useEffect, useMemo, useState } from "react";
import { $repositories, fetchRepositories } from "./model";
import { useStore } from "effector-react";
import { PAGE_LIMIT } from "./api/getRepositoriesQuery";

const MAX_PAGES_VISIBLE = 10;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [info, setInfo] = useState({
    page: Number(searchParams.get("page")) || 1,
    repoName: searchParams.get("repoName") ?? undefined,
  });

  useEffect(() => {
    const {repoName, page } = info

    repoName && searchParams.set("repoName", repoName);
    page && searchParams.set("page", String(page));
    !repoName && searchParams.delete("repoName");

    setSearchParams(searchParams);
    fetchRepositories(info);
  }, [info]);

  const repositories = useStore($repositories);

  const pageTo = useMemo(() => {
    const count = repositories?.count ?? 1;
    const MAX_PAGES_VISIBLE = 10;
    
    return count > MAX_PAGES_VISIBLE * PAGE_LIMIT + info.page
      ? MAX_PAGES_VISIBLE
      : Math.ceil((repositories?.count ?? 1) / PAGE_LIMIT);
  }, [repositories]);

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
                  key={r.id}
                />
              );
            })
          : ""}
      </RepositoryContainer>

      <PaginatorContainer>
        <Paginator
          from={info.page}
          to={pageTo}
          onSelect={(currentPage) => setInfo({ ...info, page: currentPage })}
          selected={info.page}
        />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
