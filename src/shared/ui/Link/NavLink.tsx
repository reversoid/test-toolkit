import { styled } from "@stitches/react";
import { Link as _Link } from "react-router-dom";

export const NavLink = styled(_Link, {
  color: "#0061ff",
  '&:focus': {
    color: '#453f78'
  }
});