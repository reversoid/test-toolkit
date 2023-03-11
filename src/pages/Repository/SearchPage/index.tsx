import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import { getRepositories } from "./api/getRepositories";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";
import { useEffect } from "react";
import { fetchGQL } from "../../../app/api/fetchGQL";
import { $repositories, fetchRepositories } from "./model";
import { useStore } from "effector-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePaginatorClick = (currentPage: number) => {
    setSearchParams({ page: String(currentPage) });
  };

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (!page || page === 1) {
      fetchRepositories({ page: 1 });
    } else {
      fetchGQL(getRepositories({}));
    }
  }, [searchParams.get("page")]);

  const repositories = useStore($repositories);

  return (
    <>
      <Input
        type="text"
        css={{ width: "100%" }}
        placeholder="Название репозитория"
      />

      <RepositoryContainer>
        {repositories
          ? repositories.repositories.map((r) => {
              return <RepositoryItem
                lastCommitDate={new Date(r.updatedAt)}
                link="/repository/1"
                name={r.name}
                stars={r.stargazerCount}
                key={r.owner.name + r.name}
              />;
            })
          : ""}
      </RepositoryContainer>

      <PaginatorContainer>
        <Paginator from={1} to={2} onSelect={handlePaginatorClick} />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
