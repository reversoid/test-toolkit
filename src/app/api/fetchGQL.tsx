import {
  DocumentNode,
  OperationVariables,
  QueryOptions,
  TypedDocumentNode,
} from "@apollo/client";
import { client } from "./apolloClient";

export const fetchGQL = <T,>(
  query: DocumentNode | TypedDocumentNode<T, OperationVariables>,
  options?: QueryOptions<OperationVariables, T>
) => {
  return client.query<T>({ query, ...(options ?? {}) });
};
