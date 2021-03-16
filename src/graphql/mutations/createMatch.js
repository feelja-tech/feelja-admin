import { gql } from "@apollo/client";

export const CREATE_MATCH = gql`
  mutation createMatch($now: Datetime!) {
    createMatch(input: { match: { insertedAt: $now, updatedAt: $now } }) {
      match {
        id
      }
    }
  }
`;
