import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import { GetRepositoriesResponse, getRepositories } from "./api/getRepositories";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";


const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePaginatorClick = (currentPage: number) => {
    setSearchParams({ page: String(currentPage) });
  };

  const [callback] = useLazyQuery<GetRepositoriesResponse>(getRepositories());

  return (
    <>
      <Input
        type="text"
        css={{ width: "100%" }}
        placeholder="Название репозитория"
      />

      <RepositoryContainer>
        <RepositoryItem
          lastCommitDate={new Date()}
          link="/repository/1"
          name="heh"
          stars={10}
        />
      </RepositoryContainer>

      <PaginatorContainer>
        <Paginator from={1} to={10} onSelect={handlePaginatorClick} />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
