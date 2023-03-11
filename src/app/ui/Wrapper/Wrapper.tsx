import { styled } from "@stitches/react";

export const Wrapper = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: 1300,
  paddingLeft: '1rem',
  paddingRight: '1rem',
  '@media (max-width: 400px)': {
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  paddingTop: '2rem'
});
