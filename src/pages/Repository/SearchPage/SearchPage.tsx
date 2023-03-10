import React from "react";
import { Input } from "../../../shared/ui/Input/Input";
import { styled } from "@stitches/react";
import RepositoryItem from "../../../features/repository/components/RepositoryItem/RepositoryItem";

const RepositoryContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "2rem",
});

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
          link="https://google.com"
          name="heh"
          stars={10}
        />
      </RepositoryContainer>
    </>
  );
};

export default SearchPage;
