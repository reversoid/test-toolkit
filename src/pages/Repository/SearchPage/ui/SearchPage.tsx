import React from "react";
import { Input } from "../../../../shared/ui/Input/Input";
import RepositoryItem from "../../../../entities/repository/ui/RepositoryItem";
import Paginator from "../../../../shared/ui/Paginator/Paginator";
import { RepositoryContainer } from "./RepositoryContainer";
import { PaginatorContainer } from "./PaginatorContainer";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useQuery, execute, useLazyQuery } from "@apollo/client";
import {
  GetRepositoriesResponse,
  getRepositories,
} from "../api/getRepositories";

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
