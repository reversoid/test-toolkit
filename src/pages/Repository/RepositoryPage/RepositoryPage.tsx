import React from "react";
import { Input } from "../../../shared/ui/Input/Input";
import { styled } from "@stitches/react";
import { Link } from "../../../shared/ui/Link/Link";

const Title = styled("h1", {
  fontSize: "3rem",
  marginBottom: "1.25rem",
});

const Property = styled("p");

const Img = styled("img", {
  width: "5rem",
  height: "5rem",
  objectFit: "cover",
  borderRadius: '50%',
  border: '2px solid white'
});

const PageContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const RepositoryPage = () => {
  return (
    <>
      <Title>moofy-frontend</Title>
      <PageContainer>
        <Property>Stars: 10</Property>
        <Property>Last commit cate: 10.10.2020</Property>
        <Property>
          Creator: <Link href="https://google.com">reversoid</Link>
        </Property>
        <Property>languages: Typescript, React</Property>
        <Property>Short description: Hello there!</Property>
        <Img src="https://avatars.mds.yandex.net/i?id=b14bd3bcf8f1ca20e0acccdbd5867731ac836f80-8497350-images-thumbs&n=13" />
      </PageContainer>
    </>
  );
};

export default RepositoryPage;
