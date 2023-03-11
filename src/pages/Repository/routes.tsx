import { Navigate, Route, RouteObject } from "react-router-dom";
import RepositoryPage from "./RepositoryPage/RepositoryPage";
import SearchPage from "./SearchPage";

export const routes: RouteObject[] = [
  {
    path: "search",
    element: <SearchPage />,
  },
  {
    path: ":id",
    element: <RepositoryPage />,
  },
  {
    path: "*",
    element: <Navigate to={"/repository/search"} />,
  },
  {
    path: "",
    element: <Navigate to={"/repository/search"} />,
  },
];
