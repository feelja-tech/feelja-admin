import { Drawer, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import {
  Datagrid,
  DateField,
  Edit,
  ImageField,
  List,
  maxValue,
  minValue,
  number,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  required,
  SaveButton,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
  Toolbar,
  SelectInput,
} from "react-admin";
import { connect } from "react-redux";
import { Route } from "react-router";
import { push } from "react-router-redux";
import compose from "recompose/compose";

import { JsonInput } from "react-admin-json-view";

const styles = {
  drawerContent: {
    width: 300,
  },
};

const UserprofileEditToolbar = ({ onCancel, translate, ...props }) => (
  <Toolbar {...props}>
    <SaveButton />
    <Button onClick={onCancel}>Cancel</Button>
  </Toolbar>
);

export const UserprofileEdit = ({ onCancel, ...props }) => (
  <Edit title=" " {...props}>
    <SimpleForm toolbar={<UserprofileEditToolbar onCancel={onCancel} />}>
      <ReferenceManyField
        reference="userFiles"
        target="userProfileId"
        label="Media"
      >
        <SingleFieldList>
          <ImageField source="id" />
        </SingleFieldList>
      </ReferenceManyField>
      <JsonInput
        helperText="Required keys: big: array, small: array"
        source="description"
        validate={[required()]}
        jsonString={false} // Set to true if the value is a string, default: false
        reactJsonOptions={{
          // Props passed to react-json-view
          name: null,
          collapsed: true,
          enableClipboard: true,
          displayDataTypes: true,
        }}
      />
      <TextInput
        source="score"
        validate={[required(), number(), minValue(0), maxValue(1)]}
      />
      <SelectInput
        label="Gender"
        source="gender"
        choices={[
          { id: "male", name: "male" },
          { id: "female", name: "female" },
        ]}
        validate={[required()]}
      />
    </SimpleForm>
  </Edit>
);

const _UserprofileList = ({ push, classes, ...props }) => (
  <>
    <List {...props} perPage={25}>
      <Datagrid rowClick="edit">
        <ReferenceField source="userId" reference="users" link="show">
          <TextField source="id" />
        </ReferenceField>
        <TextField source="score" />

        <TextField source="name" />
        <TextField source="gender" />
        <NumberField source="height" />
        <TextField source="politicPreferences" />
        <TextField source="religiousPreferences" />
        <TextField source="location" />

        <TextField source="description" />

        <DateField source="insertedAt" />
        <DateField source="updatedAt" />
      </Datagrid>
    </List>
    <Route path="/userProfiles/:id">
      {({ match }) => {
        const isMatch = match && match.params && match.params.id !== "create";

        return (
          <Drawer
            open={isMatch}
            anchor="right"
            onClose={() => {
              push("/userProfiles");
            }}
          >
            {isMatch ? (
              <UserprofileEdit
                className={classes.drawerContent}
                id={isMatch ? match.params.id : null}
                onCancel={() => {
                  push("/userProfiles");
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

export const UserprofileList = compose(
  connect(undefined, { push }),
  withStyles(styles)
)(_UserprofileList);
