import React from "react";
import { List, Datagrid, TextField, DateField } from "react-admin";
import { UserActions } from "../actions/UserActions";
import { UserBulkActions } from "../actions/UserBulkActions";
import { UserFilters } from "../filters/UserFilters";

export const UserList = (props) => (
  <List
    {...props}
    perPage={25}
    filters={<UserFilters />}
    actions={<UserActions />}
    bulkActionButtons={<UserBulkActions />}
    sort={{ field: "updated_at", order: "ASC" }}
    filterDefaultValues={{ state: "waiting_match" }}
  >
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="state" />
      <TextField source="phoneNumber" />
      <DateField source="insertedAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);
