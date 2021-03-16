import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
} from "react-admin";

export const UserfileList = (props) => (
  <List {...props} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="fileType" />
      <ReferenceField source="userProfileId" reference="userProfiles">
        <TextField source="id" />
      </ReferenceField>
      <DateField source="insertedAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);
