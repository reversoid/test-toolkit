import React, { useEffect, useMemo } from "react";
import { Input } from "../../../shared/ui/Input/Input";
import { styled } from "@stitches/react";
import { Link } from "../../../shared/ui/Link/Link";
import { useParams } from "react-router-dom";
import { $repository, fetchRepository } from "./model";
import { useStore } from "effector-react";
import { dateFormatter } from "../../../shared/utils/dateFormatter";

const Title = styled("h1", {
  fontSize: "3rem",
  marginBottom: "1.25rem",
});

const Property = styled("p");

const Img = styled("img", {
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
  borderRadius: "50%",
  border: "2px solid white",
});

const PageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const RepositoryPage = () => {
  const { id } = useParams();

  useEffect(() => {
    fetchRepository({ id: String(id) });
  }, []);

  const repository = useStore($repository);

  const lastCommitDate = useMemo(() => {
    return repository?.updatedAt && dateFormatter(repository?.updatedAt);
  }, [repository?.updatedAt]);

  console.log(repository);

  return (
    <>
      <Link
        href={repository?.url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Title>{repository?.name}</Title>
      </Link>
      <PageContainer>
        <Property>Stars: {repository?.stargazerCount}</Property>
        <Property>Last commit date: {lastCommitDate}</Property>
        <Property>
          Creator:{" "}
          <Link
            href={repository?.owner.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repository?.owner.name}
          </Link>
        </Property>
        <Property>
          Languages: {repository?.languages.map((l) => l.name).join(", ")}
        </Property>
        <Property>Short description: {repository?.description}</Property>
        <Img src={repository?.owner.avatarUrl ?? ""} />
      </PageContainer>
    </>
  );
};

export default RepositoryPage;
