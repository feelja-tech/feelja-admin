import { Drawer, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceField,
  ReferenceManyField,
  SaveButton,
  SimpleForm,
  SimpleList,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
} from "react-admin";
import { connect } from "react-redux";
import { Route } from "react-router";
import { push } from "react-router-redux";
import compose from "recompose/compose";

const styles = {
  drawerContent: {
    width: 300,
  },
};

const MatchesEditToolbar = ({ onCancel, translate, ...props }) => (
  <Toolbar {...props} perPage={25}>
    <SaveButton />
    <Button onClick={onCancel}>Cancel</Button>
  </Toolbar>
);

export const MatchesEdit = ({ onCancel, ...props }) => (
  <Edit title=" " {...props}>
    <SimpleForm toolbar={<MatchesEditToolbar onCancel={onCancel} />}>
      <ReferenceManyField
        reference="userMatches"
        target="matchId"
        label="Scores"
      >
        <SingleFieldList>
          <ReferenceField reference="users" source="userId">
            <ReferenceManyField
              reference="userProfiles"
              target="userId"
              label="Scores"
            >
              <SimpleList
                primaryText={(record) => record.score}
                secondaryText={(record) => record.gender}
              />
            </ReferenceManyField>
          </ReferenceField>
        </SingleFieldList>
      </ReferenceManyField>
    </SimpleForm>
  </Edit>
);

const _MatchesList = ({ push, classes, ...props }) => (
  <>
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <DateField source="insertedAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
    <Route path="/matches/:id">
      {({ match }) => {
        const isMatch = match && match.params && match.params.id !== "create";

        return (
          <Drawer
            open={isMatch}
            anchor="right"
            onClose={() => {
              push("/matches");
            }}
          >
            {isMatch ? (
              <MatchesEdit
                className={classes.drawerContent}
                id={isMatch ? match.params.id : null}
                onCancel={() => {
                  push("/matches");
                }}
                {...props}
              />
            ) : (
              <div className={classes.drawerContent} />
            )}
          </Drawer>
        );
      }}
    </Route>
  </>
);

export const MatchesList = compose(
  connect(undefined, { push }),
  withStyles(styles)
)(_MatchesList);
