import React from "react";
import { Input } from "../../../../shared/ui/Input/Input";
import RepositoryItem from "../../../../entities/repository/ui/RepositoryItem";
import Paginator from "../../../../shared/ui/Paginator/Paginator";
import { RepositoryContainer } from "./RepositoryContainer";
import { PaginatorContainer } from "./PaginatorContainer";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { getRepositories } from "../api/getRepositories";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePaginatorClick = (currentPage: number) => {
    setSearchParams({ page: String(currentPage) });
  };

  const { data, error } = useQuery(getRepositories());

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
