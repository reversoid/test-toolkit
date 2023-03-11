import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Wrapper } from "./ui/Wrapper/Wrapper";
import { routes as repositoryRoutes } from "../pages/Repository/routes";
import { client } from "./api/apolloClient";
import { ApolloProvider } from "@apollo/client";

const router = createBrowserRouter([
  {
    path: "repository",
    children: repositoryRoutes,
  },
  {
    path: "*",
    element: <Navigate to={"/repository"} />,
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </ApolloProvider>
  );
}

export default App;
