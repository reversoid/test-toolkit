import { styled } from "@stitches/react";
import React from "react";

export const Input = styled("input", {
  background: "#fff",
  padding: "0.75rem 1rem",
  border: "none",
  borderRadius: "1rem",
  outline: "none",
  "&:focus": {
    boxShadow: '0 0 10px white'
  },
});
