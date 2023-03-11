import React from "react";
import { Input } from "../../../../shared/ui/Input/Input";
import RepositoryItem from "../../../../entities/repository/ui/RepositoryItem";
import Paginator from "../../../../shared/ui/Paginator/Paginator";
import { RepositoryContainer } from "./RepositoryContainer";
import { PaginatorContainer } from "./PaginatorContainer";

const SearchPage = () => {
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
        <Paginator from={1} to={10} />
      </PaginatorContainer>
    </>
  );
};

export default SearchPage;
