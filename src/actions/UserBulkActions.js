import { useMutation } from "@apollo/client";
import { Favorite } from "@material-ui/icons";
import * as React from "react";
import { Fragment } from "react";
import { Button } from "react-admin";
import { CREATE_MATCH } from "../graphql/mutations/createMatch.js";
import { CREATE_USER_MATCH } from "../graphql/mutations/createUserMatch.js";
import moment from "moment";

const MatchSelectedButton = ({ selectedIds }) => {
  const [createMatch] = useMutation(CREATE_MATCH);
  const [createUserMatch] = useMutation(CREATE_USER_MATCH);

  const onClick = React.useCallback(
    (selectedIds) => {
      const mainUserId = selectedIds[0];
      const userIds = selectedIds.slice(1);
      const now = moment().toISOString();

      createMatch({
        variables: {
          now: now,
        },
      }).then((res) => {
        const matchId = res.data.createMatch.match.id;

        const promises = userIds.map((userId) => {
          return createUserMatch({
            variables: {
              matchId: matchId,
              userId: userId,
              now: now,
            },
          });
        });

        Promise.all(promises).then(() => {
          createUserMatch({
            variables: {
              matchId: matchId,
              now: now,
              userId: mainUserId,
              initiator: true,
            },
          }).then(() => {
            window.location.reload();
          });
        });
      });
    },
    [createMatch, createUserMatch]
  );

  return (
    <Button
      label="Match selected"
      onClick={() => {
        onClick(selectedIds);
      }}
    >
      <Favorite />
    </Button>
  );
};

export const UserBulkActions = (props) => (
  <Fragment>
    <MatchSelectedButton label="Reset Views" {...props} />
  </Fragment>
);
