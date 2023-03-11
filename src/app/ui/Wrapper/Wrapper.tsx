import { styled } from "@stitches/react";

export const Wrapper = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 1300,
  "@media (max-width: 400px)": {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  display: "flex",
  flexDirection: "column",
  height: '100%',
  padding: '2rem 1rem'
});
