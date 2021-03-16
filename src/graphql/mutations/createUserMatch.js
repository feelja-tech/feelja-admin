import { gql } from "@apollo/client";

export const CREATE_USER_MATCH = gql`
  mutation createUserMatch(
    $userId: BigInt!
    $matchId: BigInt!
    $now: Datetime!
    $initiator: Boolean
  ) {
    createUserMatch(
      input: {
        userMatch: {
          userId: $userId
          matchId: $matchId
          insertedAt: $now
          updatedAt: $now
          initiator: $initiator
        }
      }
    ) {
      userMatch {
        id
      }
    }
  }
`;
