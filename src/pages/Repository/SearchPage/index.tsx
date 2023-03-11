import { useLazyQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import RepositoryItem from "../../../entities/repository/ui/RepositoryItem";
import { Input } from "../../../shared/ui/Input/Input";
import Paginator from "../../../shared/ui/Paginator/Paginator";
import {
  GetRepositoriesResponse,
  PAGE_LIMIT,
  getRepositories,
  introspect,
} from "./api/getRepositories";
import { PaginatorContainer } from "./ui/PaginatorContainer";
import { RepositoryContainer } from "./ui/RepositoryContainer";
import { convertReposResponse } from "./utils/convertReposResponse";
import { setRepositories } from "./model";
import { useEffect } from "react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePaginatorClick = (currentPage: number) => {
    setSearchParams({ page: String(currentPage) });
  };

  const [callback, { data }] = useLazyQuery<GetRepositoriesResponse>(
    getRepositories({}),
    {
      onCompleted: (data) => {
        const convertedData = convertReposResponse(data);
        setRepositories(convertedData);
      },
    }
  );

  useEffect(() => {
    const page = Number(searchParams.get("page"));
    if (!page || page === 1) {
      callback();
    } else {
      callback({ query: getRepositories({}) });
    }
  }, [searchParams.get("page")]);

  console.log(data);

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
        <Paginator from={1} to={2} onSelect={handlePaginatorClick} />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
