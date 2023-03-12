import { styled } from "@stitches/react";
import React, { FC, useMemo } from "react";

const PaginatorContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const PageNumberButton = styled("button", {
  borderRadius: "0.25rem",
  minWidth: "1.25rem",
  height: "1.25rem",
  padding: "0 0.125rem",
  background: "white",
  textAlign: "center",
  "&:focus": {
    boxShadow: "0 0 10px white",
  },
  variants: {
    selected: {
      true: {
        background: '#ccfbfe'
      }
    }
  }
});

export interface PaginatorProps {
  from: number;
  to: number;
  onSelect?: (page: number) => void;
  selected?: number;
}

const createArrayFromTo = ({ from, to }: PaginatorProps) => {
  const result = [];
  for (let i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
};

const Paginator: FC<PaginatorProps> = ({ from, to, onSelect, selected }) => {
  const numbers = useMemo(() => createArrayFromTo({ from, to }), [from, to]);

  return (
    <PaginatorContainer>
      {numbers.map((n) => (
        <PageNumberButton
          onClick={(e) => {
            onSelect && onSelect(n)
            return (e.target as HTMLButtonElement).blur();
          }}
          key={n}
          selected={selected === n}
        >
          {n}
        </PageNumberButton>
      ))}
    </PaginatorContainer>
  );
};

export default Paginator;
