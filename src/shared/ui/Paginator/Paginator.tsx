import { styled } from "@stitches/react";
import React, { FC, useMemo } from "react";

const PaginatorContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const PageNumberItem = styled("div", {
  borderRadius: "0.25rem",
  minWidth: "1.25rem",
  height: "1.25rem",
  padding: '0 0.125rem',
  background: "white",
  textAlign: "center",
});

export interface PaginatorProps {
  from: number;
  to: number;
}

const createArrayFromTo = ({ from, to }: PaginatorProps) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

const Paginator: FC<PaginatorProps> = ({ from, to }) => {
  const numbers = useMemo(() => createArrayFromTo({ from, to }), [from, to]);

  return (
    <PaginatorContainer>
      {numbers.map((n) => (
        <PageNumberItem>{n}</PageNumberItem>
      ))}
    </PaginatorContainer>
  );
};

export default Paginator;
