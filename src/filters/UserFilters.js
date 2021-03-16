import React from "react";
import { Filter, TextInput } from "react-admin";

export const UserFilters = (props) => (
  <Filter {...props}>
    <TextInput label="State" source="state" defaultValue="waiting_match" />
  </Filter>
);

export default UserFilters;
