import { styled } from "@stitches/react";
import React, { FC, useMemo } from "react";
import { Link } from "../../../shared/ui/Link/Link";
import { dateFormatter } from "../../../shared/utils/dateFormatter";
import { NavLink } from "../../../shared/ui/Link/NavLink";

const ItemContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  background: "white",
  borderRadius: "0.25rem",
  padding: "1rem",
  flexDirection: "column",
  alignItems: "center",
});

const ItemName = styled("h6", {
  fontSize: "2rem",
  fontWeight: 600,
});

const ItemProperty = styled("p", {
  fontSize: "1rem",
  color: "black",
});

export interface RepositoryItemProps {
  name: string;
  stars: number;
  lastCommitDate: Date;
  link: string;
}

const RepositoryItem: FC<RepositoryItemProps> = (props) => {
  const formattedDate = useMemo(() => {
    return dateFormatter(props.lastCommitDate);
  }, [props.lastCommitDate]);

  return (
    <ItemContainer>
      <NavLink to={props.link}>
        <ItemName>{props.name}</ItemName>
      </NavLink>

      <ItemProperty>stars: {props.stars}</ItemProperty>
      <ItemProperty>last commit: {formattedDate}</ItemProperty>
    </ItemContainer>
  );
};

export default RepositoryItem;
