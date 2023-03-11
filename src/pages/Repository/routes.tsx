import { Navigate, Route, RouteObject } from "react-router-dom";
import SearchPage from "./SearchPage/ui/SearchPage";
import RepositoryPage from "./RepositoryPage/RepositoryPage";

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
